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
  password: 'theo1234'
});

// BANCO DE DADOS

// ABRINDO O SERVIDOR
app.listen(4000, () => console.log('Servidor Aberto'))
routes(app)
// ABRINDO O SERVIDOR

// EXPORTAÇÕES
module.exports.app = app
module.exports.connection = connection
// EXPORTAÇÕES