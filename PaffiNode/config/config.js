// REQUIRES
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mysql = require('mysql2');
const routes = require('../routes/routes.js');
const bodyParser = require('body-parser');
const path = require('path')
// REQUIRES

// CONFIGURANDO EXPRESS
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
// CONFIGURANDO EXPRESS

// BANCO DE DADOS
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'paffi',
  password: ''
});
// BANCO DE DADOS
connection.query('CREATE DATABASE IF NOT EXISTS paffi;', (err, result) => {
  if (result) {
    if (result.warningStatus == 1) {
      connection.config.database = 'paffi'
      console.log('Você está conectado ao BD:', connection.config.database)
    } else {
      connection.config.database = 'paffi'
      connection.query('USE paffi;')
      connection.query('\
    CREATE TABLE usuario(\
    id_usuario VARCHAR(30),\
    matricula VARCHAR(10),\
    email VARCHAR(255),\
    nome VARCHAR(255),\
    photoURL VARCHAR(255),\
    senha VARCHAR (30),\
    turma VARCHAR (10),\
    PRIMARY KEY (id_usuario) \
    );', (err, resu) => {
          if (err) console.log('Erro na criação da Tabela')
        })
      connection.query('\
    CREATE TABLE loja(\
    id_loja INT AUTO_INCREMENT,\
    nome_loja VARCHAR(255),\
    photoURL VARCHAR(255),\
    id_dono VARCHAR(30),\
    PRIMARY KEY (id_loja),\
    FOREIGN KEY (id_dono) REFERENCES usuario(id_usuario)\
    );', (err, resu) => {
          if (err) console.log('Erro na criação da Tabela')
        })
      connection.query('\
    CREATE TABLE produto (\
    id_produto INT AUTO_INCREMENT,\
    nome VARCHAR (40),\
    photoURL VARCHAR (255), \
    descricao VARCHAR (40), \
    categoria VARCHAR (40), \
    valor FLOAT, \
    id_loja INT,\
    PRIMARY KEY (id_produto),\
    FOREIGN KEY (id_loja) REFERENCES loja (id_loja)\
    );', (err, resu) => {
          if (err) console.log('Erro na criação da Tabela')
        })
      connection.query('\
    CREATE TABLE compra (\
    id_compra INT AUTO_INCREMENT,\
    valor_compra DECIMAL (5,2),\
    data_compra DATE,\
    hora_compra TIME,\
    usuario varchar(30),\
    id_produto INT,\
    PRIMARY KEY (id_compra),\
    FOREIGN KEY(usuario) REFERENCES usuario(id_usuario),\
    FOREIGN KEY(id_produto) REFERENCES produto(id_produto)\
    );', (err, resu) => {
          if (err) console.log('Erro na criação da Tabela')
        })
      connection.query('\
    CREATE TABLE compra_produto(\
    id_produto INT,\
    id_compra INT,\
    quant INT,\
    FOREIGN KEY (id_produto) REFERENCES produto (id_produto),\
    FOREIGN KEY (id_compra) REFERENCES compra (id_compra)\
    );', (err, resu) => {
          if (err) { console.log('Erro na criação da Tabela') }
          else {
            console.log('Banco de dados Paffi criado com sucesso!')
          }
        })
    }
  }else{
    console.log('Tá ruim viado')
  }
})
// ABRINDO O SERVIDOR
app.listen(4000, () => console.log('Servidor Aberto'))
routes(app)
// ABRINDO O SERVIDOR

// EXPORTAÇÕES
module.exports.app = app
module.exports.connection = connection
// EXPORTAÇÕES