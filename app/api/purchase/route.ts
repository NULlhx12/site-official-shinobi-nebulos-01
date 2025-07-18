import { type NextRequest, NextResponse } from "next/server"
import { getConnection } from "@/lib/database"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const {
      playerName,
      playerEmail,
      itemType,
      itemId,
      itemName,
      quantity = 1,
      price,
      paymentMethod,
    } = await request.json()

    // Validações
    if (!playerName || !itemType || !itemId || !price) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados obrigatórios não fornecidos",
        },
        { status: 400 },
      )
    }

    const connection = await getConnection()

    // Gera ID único da transação
    const transactionId = crypto.randomUUID()

    // Salva a compra
    const [result] = await connection.execute(
      `INSERT INTO purchases 
       (player_name, player_email, item_type, item_id, item_name, quantity, price, transaction_id, payment_method, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'paid')`,
      [playerName, playerEmail, itemType, itemId, itemName, quantity, price, transactionId, paymentMethod],
    )

    const purchaseId = (result as any).insertId

    // Gera código de resgate único
    const deliveryCode = generateDeliveryCode()

    await connection.execute("INSERT INTO delivery_codes (code, purchase_id, player_name) VALUES (?, ?, ?)", [
      deliveryCode,
      purchaseId,
      playerName,
    ])

    // Atualiza/cria registro do jogador
    await connection.execute(
      `INSERT INTO players (minecraft_name, email) VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE email = VALUES(email), last_seen = CURRENT_TIMESTAMP`,
      [playerName, playerEmail],
    )

    await connection.end()

    return NextResponse.json({
      success: true,
      transactionId,
      deliveryCode,
      message: `Compra realizada com sucesso! Use o código ${deliveryCode} no servidor para resgatar.`,
    })
  } catch (error) {
    console.error("Erro na compra:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

function generateDeliveryCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
