const app = require('../config/config')
const firebase = require('../config/firebase')

exports.getId = function () {
    app.connection.query('SELECT `id_loja` FROM `loja` WHERE `id_dono` = ?',
        [firebase.auth().currentUser.uid], (err, resu) => {
            return resu[0].id_loja
        })
}

exports.getMyStoreName = () => {
    app.connection.query('SELECT * FROM `loja` WHERE `id_dono` = ?',
        [firebase.auth().currentUser.uid], (err, resu) => {
            return resu[0].nome_loja
        })
}

exports.getStoreNameById = function (id) {
    app.connection.query('SELECT * FROM `loja` WHERE `id_loja` = ?',
        [id], (err, resu) => {
            return resu[0].nome_loja
        })
}

exports.getMyStore = () => {
    app.connection.query('SELECT * FROM `loja` WHERE `id_dono` = ?',
        [firebase.auth().currentUser.uid], (err, resu) => {
            return resu[0]
        })
}

exports.getStore = function (id) {
    app.connection.query('SELECT * FROM `loja` WHERE `id_loja` = ?',
        [id], (err, resu) => {
            return resu[0]
        })
}

exports.updateStore = function (id, nome, url) {
    app.connection.query('UPDATE `loja` SET `nome_loja` = ?, `photoURL` = ? WHERE id_dono = id'),
        [nome, url, id], (err, resu) => {
            if (err) console.log('deu ruim')
        }
}

exports.addProduct = function () {
    app.connection.query
}
