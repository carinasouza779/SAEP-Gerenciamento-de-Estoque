// ============================================
 // server.js - Inicialização do servidor
// ============================================

const express = require("express");
const path = require("node:path");
const rotasProdutos = require("./routes/produtos");

const app = express();
const PORTA = 3000;

// Permite que o servidor entenda dados JSON enviados pelo front-end.
app.use(express.json());

// Disponibiliza os arquivos HTML, CSS e JavaScript da pasta public.
app.use(express.static(path.join(__dirname, "public")));

// Todas as rotas de produtos começam com /api/produtos.
app.use("/api/produtos", rotasProdutos);

// Inicia o servidor.
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
