# SAEP — Gerenciamento de Estoque

Sistema básico de gerenciamento de estoque feito com **Node.js, Express, SQLite, HTML, CSS e JavaScript**. O objetivo é servir como modelo de estudo para atividades práticas que pedem banco de dados, API, rotas e CRUD.

## 1. O que o sistema faz

- Cadastra produtos.
- Lista os produtos cadastrados.
- Consulta um produto pelo ID.
- Edita produtos.
- Exclui produtos.
- Atualiza a tabela do front-end usando a API.

## 2. Tecnologias

- Node.js
- Express
- SQLite pelo módulo nativo `node:sqlite` (não precisa instalar `better-sqlite3`).
- HTML, CSS e JavaScript separados em pastas.

> O módulo `node:sqlite` está disponível nas versões atuais do Node.js. Em algumas versões ele pode exibir um aviso de recurso experimental.

## 3. Como baixar e executar

Abra o terminal na pasta em que deseja guardar o projeto:

```bash
git clone https://github.com/carinasouza779/SAEP-Gerenciamento-de-Estoque.git
cd SAEP-Gerenciamento-de-Estoque
npm install
npm start
```

Depois acesse no navegador: http://localhost:3000

Para reiniciar automaticamente o servidor durante o desenvolvimento:

```bash
npm run dev
```

O arquivo do banco `database/estoque.db` e a tabela `produtos` são criados automaticamente quando o servidor inicia pela primeira vez. Não é necessário criar o banco manualmente.

## 4. Estrutura de pastas

```text
SAEP-Gerenciamento-de-Estoque/
├── database/
│   └── db.js
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── index.html
├── routes/
│   └── produtos.js
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 5. Rotas da API

Todas as rotas começam com `/api/produtos`.

| Método | Rota | O que faz |
|---|---|---|
| GET | `/api/produtos` | Lista todos os produtos |
| GET | `/api/produtos/:id` | Consulta um produto pelo ID |
| POST | `/api/produtos` | Cadastra um produto |
| PUT | `/api/produtos/:id` | Edita um produto pelo ID |
| DELETE | `/api/produtos/:id` | Exclui um produto pelo ID |

Exemplo de JSON para cadastro ou edição:

```json
{
  "nome": "Teclado",
  "categoria": "Informática",
  "quantidade": 10,
  "preco": 89.90
}
```

## 6. Para que serve cada arquivo

- `server.js`: inicia o servidor, configura o Express e conecta as rotas.
- `database/db.js`: abre o banco SQLite e cria a tabela.
- `routes/produtos.js`: contém as rotas GET, POST, PUT e DELETE. Cada rota tem comentário explicando sua função.
- `public/index.html`: estrutura da página e formulário.
- `public/css/style.css`: aparência da página.
- `public/js/script.js`: captura os dados do formulário, chama a API com `fetch` e atualiza a tabela.
- `package.json`: lista as dependências e os comandos do projeto.

## 7. Guia rápido para adaptar na prova

A lógica é a mesma para estoque, clientes, funcionários, livros, veículos ou pedidos. Você troca os nomes e os campos, mas mantém a estrutura.

### Passo 1 — Escolha a entidade

Exemplo: trocar produtos por clientes.

- Tabela: `produtos` → `clientes`
- Rota: `/api/produtos` → `/api/clientes`
- Arquivo de rota: `produtos.js` → `clientes.js`

### Passo 2 — Modifique o banco

No arquivo `database/db.js`, altere o nome da tabela e os campos. Exemplo:

```sql
CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT
);
```

Os campos do SQL precisam combinar com os campos usados nas rotas.

### Passo 3 — Modifique as rotas

Em `routes/produtos.js`, troque:

- O nome da tabela nos comandos SQL.
- Os campos recebidos em `req.body`.
- As colunas do INSERT e do UPDATE.
- O caminho montado no `server.js`.

Lembrete:
- `req.body`: dados enviados no cadastro/edição.
- `req.params.id`: valor que vem da URL, como `/api/clientes/3`.
- `res.json(...)`: devolve dados em JSON.
- `res.status(201)`: informa que um registro foi criado.
- `res.status(404)`: informa que o registro não foi encontrado.

### Passo 4 — Modifique o front-end

No `index.html`, ajuste os campos do formulário e os títulos da tabela. No `script.js`, ajuste o objeto `dados`, a URL da API e as colunas exibidas.

### Passo 5 — Teste

1. Inicie com `npm start`.
2. Abra `http://localhost:3000`.
3. Cadastre um registro.
4. Atualize a página e confira se continua salvo.
5. Edite e exclua um registro.

## 8. O que é CRUD?

- **Create (POST):** criar/cadastrar.
- **Read (GET):** ler/listar/consultar.
- **Update (PUT):** atualizar/editar.
- **Delete (DELETE):** excluir.

## 9. Se estiver sem internet na prova

Deixe o projeto já baixado no computador antes da prova e execute `npm install` antecipadamente. A pasta `node_modules` contém as dependências instaladas; não a apague se precisar trabalhar sem internet. O banco SQLite é criado localmente e funciona sem Wi-Fi.

Se precisar clonar o repositório durante a prova, o comando é `git clone`, mas ele exige internet. Para trabalhar offline, use uma cópia local do projeto ou baixe o ZIP antes.
