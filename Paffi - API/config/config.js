// REQUIRES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')
var port = process.env.PORT || 3000;
const mysql = require('mysql2');
const routes = require('../routes/routes.js');
// REQUIRES

// CONFIGURANDO EXPRESS
app.use(bodyParser.json())
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.raw({
    type: 'image/',
}));
// CONFIGURANDO EXPRESS

//BANCO DE DADOS
const connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'wcnbXQoWMJ',
    database: 'wcnbXQoWMJ',
    password: 'wElFlOEvvn',
    port: 3306
});

function sendit() {
    connection.query('SHOW TABLES;', (err, result) => {
        console.log('ゴゴゴゴ');
    })
    setTimeout(sendit, 210000);
}
setTimeout(sendit, 210000);
// BANCO DE DADOS



// ABRINDO O SERVIDOR
app.listen(port, () => console.log('Servidor Aberto'))
routes(app)
// ABRINDO O SERVIDOR

// EXPORTAÇÕES
module.exports.app = app
module.exports.connection = connection
// EXPORTAÇÕES