// ============================================
 // database/db.js - Configuração do banco SQLite
// ============================================

const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");
const fs = require("node:fs");

// Caminho da pasta e do arquivo do banco de dados.
const pastaBanco = __dirname;
const caminhoBanco = path.join(pastaBanco, "estoque.db");

// Garante que a pasta database exista.
if (!fs.existsSync(pastaBanco)) {
  fs.mkdirSync(pastaBanco, { recursive: true });
}

// Abre o banco. Se o arquivo não existir, o SQLite cria automaticamente.
const db = new DatabaseSync(caminhoBanco);

// Cria a tabela de produtos somente se ela ainda não existir.
db.exec(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    categoria TEXT NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 0,
    preco REAL NOT NULL DEFAULT 0,
    criado_em TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
