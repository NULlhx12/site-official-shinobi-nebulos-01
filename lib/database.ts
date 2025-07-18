import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "shinobi_store",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

export async function getConnection() {
  return await mysql.createConnection(dbConfig)
}

export async function initDatabase() {
  const connection = await getConnection()

  // Tabela de compras
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      player_name VARCHAR(50) NOT NULL,
      player_email VARCHAR(100),
      item_type ENUM('vip', 'spin') NOT NULL,
      item_id VARCHAR(50) NOT NULL,
      item_name VARCHAR(100) NOT NULL,
      quantity INT DEFAULT 1,
      price DECIMAL(10,2) NOT NULL,
      transaction_id VARCHAR(100) UNIQUE,
      payment_method VARCHAR(50),
      status ENUM('pending', 'paid', 'delivered', 'failed') DEFAULT 'pending',
      purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      delivery_date TIMESTAMP NULL,
      delivery_attempts INT DEFAULT 0
    )
  `)

  // Tabela de jogadores
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS players (
      id INT AUTO_INCREMENT PRIMARY KEY,
      minecraft_name VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100),
      current_vip VARCHAR(50) DEFAULT NULL,
      vip_expires TIMESTAMP NULL,
      total_spins INT DEFAULT 0,
      last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Tabela de códigos de resgate
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS delivery_codes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      code VARCHAR(20) UNIQUE NOT NULL,
      purchase_id INT NOT NULL,
      player_name VARCHAR(50) NOT NULL,
      used BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      used_at TIMESTAMP NULL,
      FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    )
  `)

  await connection.end()
}
