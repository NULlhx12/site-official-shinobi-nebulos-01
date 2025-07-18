import { type NextRequest, NextResponse } from "next/server"
import { getConnection } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const connection = await getConnection()

    const [rows] = await connection.execute(`
      SELECT 
        p.*,
        dc.code as delivery_code
      FROM purchases p
      LEFT JOIN delivery_codes dc ON p.id = dc.purchase_id
      WHERE p.status = 'paid' AND (dc.used = FALSE OR dc.used IS NULL)
      ORDER BY p.purchase_date ASC
    `)

    await connection.end()

    return NextResponse.json({
      success: true,
      purchases: rows,
    })
  } catch (error) {
    console.error("Erro ao buscar compras:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar compras pendentes",
      },
      { status: 500 },
    )
  }
}
