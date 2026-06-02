const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();

// Configuração do servidor
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('.'));

// Conexão com o banco de dados
const db = new sqlite3.Database('./sissenai.db');

// Inicialização das tabelas
db.serialize(() => {
  // Tabela de clientes
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      cpf TEXT,
      telefone TEXT
    )
  `);

  // Tabela de produtos
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT,
      preco REAL,
      estoque INTEGER
    )
  `);
});

// --- ROTAS DE CLIENTES ---

app.post('/salvar-cliente', (req, res) => {
  const { nome, cpf, telefone } = req.body;

  db.run(
    `INSERT INTO clientes (nome, cpf, telefone) VALUES (?, ?, ?)`,
    [nome, cpf, telefone],
    (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      res.redirect('/clientes.html');
    }
  );
});

app.get('/listar-clientes', (req, res) => {
  db.all(`SELECT * FROM clientes`, [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
});

// Iniciar servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`SISSENAI RODANDO EM: http://localhost:${PORT}`);
  console.log(`=============================================`);
});
