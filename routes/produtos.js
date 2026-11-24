// ============================================
 // routes/produtos.js - Rotas CRUD de produtos
// ============================================

const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET /api/produtos
// LISTAR: retorna todos os produtos cadastrados.
router.get("/", (req, res) => {
  try {
    const produtos = db.prepare(
      "SELECT * FROM produtos ORDER BY id DESC"
    ).all();

    res.json(produtos);
  } catch (erro) {
    res.status(500).json({ erro: "Não foi possível listar os produtos." });
  }
});

// GET /api/produtos/:id
// CONSULTAR: retorna somente o produto que possui o ID informado.
router.get("/:id", (req, res) => {
  try {
    const produto = db.prepare(
      "SELECT * FROM produtos WHERE id = ?"
    ).get(req.params.id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    res.json(produto);
  } catch (erro) {
    res.status(500).json({ erro: "Não foi possível consultar o produto." });
  }
});

// POST /api/produtos
// CADASTRAR: recebe os dados enviados pelo front-end e salva no banco.
router.post("/", (req, res) => {
  const { nome, categoria, quantidade, preco } = req.body;

  if (!nome || !categoria || quantidade === undefined || preco === undefined) {
    return res.status(400).json({ erro: "Preencha todos os campos." });
  }

  const qtd = Number(quantidade);
  const valor = Number(preco);

  if (!Number.isInteger(qtd) || qtd < 0 || !Number.isFinite(valor) || valor < 0) {
    return res.status(400).json({ erro: "Quantidade ou preço inválido." });
  }

  try {
    const resultado = db.prepare(`
      INSERT INTO produtos (nome, categoria, quantidade, preco)
      VALUES (?, ?, ?, ?)
    `).run(nome.trim(), categoria.trim(), qtd, valor);

    const novoProduto = db.prepare(
      "SELECT * FROM produtos WHERE id = ?"
    ).get(Number(resultado.lastInsertRowid));

    res.status(201).json(novoProduto);
  } catch (erro) {
    res.status(500).json({ erro: "Não foi possível cadastrar o produto." });
  }
});

// PUT /api/produtos/:id
// EDITAR: atualiza os dados do produto indicado pelo ID.
router.put("/:id", (req, res) => {
  const { nome, categoria, quantidade, preco } = req.body;

  if (!nome || !categoria || quantidade === undefined || preco === undefined) {
    return res.status(400).json({ erro: "Preencha todos os campos." });
  }

  const qtd = Number(quantidade);
  const valor = Number(preco);

  if (!Number.isInteger(qtd) || qtd < 0 || !Number.isFinite(valor) || valor < 0) {
    return res.status(400).json({ erro: "Quantidade ou preço inválido." });
  }

  try {
    const resultado = db.prepare(`
      UPDATE produtos
      SET nome = ?, categoria = ?, quantidade = ?, preco = ?
      WHERE id = ?
    `).run(nome.trim(), categoria.trim(), qtd, valor, req.params.id);

    if (Number(resultado.changes) === 0) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    const produtoAtualizado = db.prepare(
      "SELECT * FROM produtos WHERE id = ?"
    ).get(req.params.id);

    res.json(produtoAtualizado);
  } catch (erro) {
    res.status(500).json({ erro: "Não foi possível editar o produto." });
  }
});

// DELETE /api/produtos/:id
// EXCLUIR: remove do banco o produto indicado pelo ID.
router.delete("/:id", (req, res) => {
  try {
    const resultado = db.prepare(
      "DELETE FROM produtos WHERE id = ?"
    ).run(req.params.id);

    if (Number(resultado.changes) === 0) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    res.json({ mensagem: "Produto excluído com sucesso." });
  } catch (erro) {
    res.status(500).json({ erro: "Não foi possível excluir o produto." });
  }
});

module.exports = router;
