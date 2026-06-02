const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();

//Configuração do Servidor
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json()); // Necessário para o carrinho de compras (JSON)
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('.'); // Serve seus arquivos HTML, CSS e imagens

// Conexão com o Banco de Dados
const db = new sqlite3.Database('./sissenai.db');

//Inicialização das Tabelas (Cria apenas se não existirem)
db.serialze(() =>{
  // Tabela de Clientes
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
  id INTERGER PRIMARY KEY AUTOINCREMENT,
  descricao TEXT,
  preco REAL,
  estoque INTERGER
  )`);

  // --- ROTAS DE CLIENTES ---
            app.post('/salvar-cliente',(req,res) =>{
              const { nome, cpf, telefone} = req.body;
              db.run(`INSERT INTO clientes (nome, cpf, telefone) VALUES (?,?,?)`,[nome, cpf, telefone], (err) =>{
                if (err) return res.status(500).send(err.message);
                res.redirect('/clientes.html');
                {);
                });
app.get('/listar-clientes',(req,res) =>{
  db.all("SELECT * FROM clientes",[],(err, rows)=>{
    if(err)return res.status(500).json(err)
  });
});

  // Iniciar Servidor
  const PORT = 3000;
  app.listen(PORT, () =>{
    console.log(`=============================================`);
    console.log(`SISSENAI RODANDO EM: http://localhost:${PORT}`)
    console.log(`=============================================`);
  });
  
