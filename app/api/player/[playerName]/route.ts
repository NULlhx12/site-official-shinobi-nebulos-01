import { type NextRequest, NextResponse } from "next/server"
import { getConnection } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { playerName: string } }) {
  try {
    const playerName = params.playerName
    const connection = await getConnection()

    // Busca dados do jogador
    const [playerRows] = await connection.execute("SELECT * FROM players WHERE minecraft_name = ?", [playerName])

    // Busca histórico de compras
    const [purchaseRows] = await connection.execute(
      `
      SELECT p.*, dc.code, dc.used 
      FROM purchases p
      LEFT JOIN delivery_codes dc ON p.id = dc.purchase_id
      WHERE p.player_name = ?
      ORDER BY p.purchase_date DESC
    `,
      [playerName],
    )

    await connection.end()

    const player = Array.isArray(playerRows) && playerRows.length > 0 ? playerRows[0] : null

    return NextResponse.json({
      success: true,
      player,
      purchases: purchaseRows,
    })
  } catch (error) {
    console.error("Erro ao buscar jogador:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar dados do jogador",
      },
      { status: 500 },
    )
  }
}
