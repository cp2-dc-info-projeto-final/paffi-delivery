const app = require('../config/config')
const firebase = require('../config/firebase')

exports.getUser = function (id) {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM `usuario` WHERE id_usuario = ?',
        [id], (err, resu) => {
            console.log(err);
            (resu) ? resolve(resu[0]) : reject(err)
        })
    })
}

exports.attUser = function (id, nome, foto) {
    return new Promise((resolve, reject) => {
        app.connection.query('update `usuario` set `nome` = ?, photoURL = ? WHERE `id_usuario` = ?',
        [nome, foto, id], (err, resu) => {
            console.log(err);
            (resu) ? resolve(resu[0]) : reject(err)
        })
    })
}

exports.getHistorico = function (id) {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT c.valor_compra, c.data_compra, c.hora_compra, c.id_compra, p.id_loja, l.nome_loja FROM `compra` AS `c` JOIN compra_produto as cp on cp.id_compra = c.id_compra JOIN produto as p on cp.id_produto = p.id_produto JOIN loja as l on p.id_loja = l.id_loja WHERE id_usuario = ? ORDER BY c.hora_compra DESC',
        [id], (err, resu) => {
            (resu) ? resolve(resu) : reject(err)
        })
    })
}