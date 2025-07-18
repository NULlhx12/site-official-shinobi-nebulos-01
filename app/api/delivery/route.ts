import { type NextRequest, NextResponse } from "next/server"
import { getConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { code, playerName } = await request.json()

    const connection = await getConnection()

    // Verifica se o código existe e não foi usado
    const [codeRows] = await connection.execute(
      `
      SELECT dc.*, p.* 
      FROM delivery_codes dc
      JOIN purchases p ON dc.purchase_id = p.id
      WHERE dc.code = ? AND dc.player_name = ? AND dc.used = FALSE
    `,
      [code, playerName],
    )

    if (!Array.isArray(codeRows) || codeRows.length === 0) {
      await connection.end()
      return NextResponse.json(
        {
          success: false,
          error: "Código inválido ou já utilizado",
        },
        { status: 404 },
      )
    }

    const purchase = codeRows[0] as any

    // Marca código como usado
    await connection.execute("UPDATE delivery_codes SET used = TRUE, used_at = CURRENT_TIMESTAMP WHERE code = ?", [
      code,
    ])

    // Atualiza status da compra
    await connection.execute(
      'UPDATE purchases SET status = "delivered", delivery_date = CURRENT_TIMESTAMP WHERE id = ?',
      [purchase.purchase_id],
    )

    // Atualiza dados do jogador baseado no tipo de item
    if (purchase.item_type === "vip") {
      const vipDuration = getVipDuration(purchase.item_id)
      await connection.execute(
        `
        UPDATE players 
        SET current_vip = ?, vip_expires = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL ? DAY)
        WHERE minecraft_name = ?
      `,
        [purchase.item_id, vipDuration, playerName],
      )
    } else if (purchase.item_type === "spin") {
      await connection.execute(
        `
        UPDATE players 
        SET total_spins = total_spins + ?
        WHERE minecraft_name = ?
      `,
        [purchase.quantity, playerName],
      )
    }

    await connection.end()

    return NextResponse.json({
      success: true,
      item: {
        type: purchase.item_type,
        name: purchase.item_name,
        quantity: purchase.quantity,
      },
      message: `${purchase.item_name} entregue com sucesso!`,
    })
  } catch (error) {
    console.error("Erro na entrega:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao processar entrega",
      },
      { status: 500 },
    )
  }
}

function getVipDuration(vipId: string): number {
  const durations: { [key: string]: number } = {
    genesis: 30,
    arising: 30,
    awakening: 30,
    immortal: 60,
    ascendant: 90,
  }
  return durations[vipId] || 30
}
