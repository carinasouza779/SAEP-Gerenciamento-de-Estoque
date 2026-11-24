// ============================================
 // public/js/script.js - Comunicação com a API
// ============================================

// Endereço base das rotas de produtos no servidor.
const API = "/api/produtos";

// Guarda os elementos HTML que serão utilizados.
const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const totalProdutos = document.getElementById("totalProdutos");
const produtoId = document.getElementById("produtoId");
const tituloFormulario = document.getElementById("tituloFormulario");
const botaoSalvar = document.getElementById("botaoSalvar");
const botaoCancelar = document.getElementById("botaoCancelar");

// Quando a página abre, busca os produtos cadastrados.
document.addEventListener("DOMContentLoaded", carregarProdutos);

// LISTAR: solicita à API todos os produtos e monta a tabela.
async function carregarProdutos() {
  try {
    const resposta = await fetch(API);
    const produtos = await resposta.json();

    if (!resposta.ok) throw new Error(produtos.erro || "Erro ao carregar.");

    totalProdutos.textContent = produtos.length;

    if (produtos.length === 0) {
      lista.innerHTML = '<tr><td colspan="6" class="vazio">Nenhum produto cadastrado.</td></tr>';
      return;
    }

    lista.innerHTML = "";

    produtos.forEach((produto) => {
      const linha = document.createElement("tr");

      // textContent evita interpretar o nome/categoria como código HTML.
      const valores = [
        produto.id,
        produto.nome,
        produto.categoria,
        produto.quantidade,
        Number(produto.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      ];

      valores.forEach((valor) => {
        const celula = document.createElement("td");
        celula.textContent = valor;
        linha.appendChild(celula);
      });

      const celulaAcoes = document.createElement("td");
      const grupo = document.createElement("div");
      grupo.className = "acoes";

      const editar = document.createElement("button");
      editar.textContent = "Editar";
      editar.className = "pequeno secundario";
      editar.addEventListener("click", () => prepararEdicao(produto));

      const excluir = document.createElement("button");
      excluir.textContent = "Excluir";
      excluir.className = "pequeno perigo";
      excluir.addEventListener("click", () => excluirProduto(produto.id));

      grupo.append(editar, excluir);
      celulaAcoes.appendChild(grupo);
      linha.appendChild(celulaAcoes);
      lista.appendChild(linha);
    });
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

// CADASTRAR ou EDITAR: decide entre POST e PUT conforme exista um ID.
form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const id = produtoId.value;
  const dados = {
    nome: document.getElementById("nome").value.trim(),
    categoria: document.getElementById("categoria").value.trim(),
    quantidade: Number(document.getElementById("quantidade").value),
    preco: Number(document.getElementById("preco").value)
  };

  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API}/${id}` : API;

  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    if (!resposta.ok) throw new Error(resultado.erro || "Não foi possível salvar.");

    mostrarMensagem(id ? "Produto atualizado!" : "Produto cadastrado!");
    limparFormulario();
    carregarProdutos();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
});

// Preenche o formulário com os dados do produto escolhido para edição.
function prepararEdicao(produto) {
  produtoId.value = produto.id;
  document.getElementById("nome").value = produto.nome;
  document.getElementById("categoria").value = produto.categoria;
  document.getElementById("quantidade").value = produto.quantidade;
  document.getElementById("preco").value = produto.preco;

  tituloFormulario.textContent = "Editar produto";
  botaoSalvar.textContent = "Salvar alterações";
  botaoCancelar.classList.remove("oculto");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// EXCLUIR: pede confirmação e envia DELETE para a API.
async function excluirProduto(id) {
  if (!confirm("Deseja realmente excluir este produto?")) return;

  try {
    const resposta = await fetch(`${API}/${id}`, { method: "DELETE" });
    const resultado = await resposta.json();
    if (!resposta.ok) throw new Error(resultado.erro || "Não foi possível excluir.");

    mostrarMensagem("Produto excluído!");
    carregarProdutos();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

// Limpa o formulário e volta ao modo de cadastro.
function limparFormulario() {
  form.reset();
  produtoId.value = "";
  tituloFormulario.textContent = "Adicionar produto";
  botaoSalvar.textContent = "Cadastrar produto";
  botaoCancelar.classList.add("oculto");
}

// Mostra mensagens de sucesso ou erro na tela.
function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.classList.toggle("erro", erro);
}

// Botões auxiliares.
botaoCancelar.addEventListener("click", limparFormulario);
document.getElementById("botaoAtualizar").addEventListener("click", carregarProdutos);
