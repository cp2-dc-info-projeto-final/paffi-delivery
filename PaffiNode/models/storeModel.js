const app = require('../config/config')
const firebase = require('../config/firebase')

exports.getId = function () {
    app.connection.query('SELECT `id_loja` FROM `loja` WHERE `id_dono` = ?',
        [firebase.auth().currentUser.uid], (err, resu) => {
            return resu[0].id_loja
        })
}

exports.getMyStoreName = function () {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM `loja` WHERE `id_dono` = ?',
            [firebase.auth().currentUser.uid], (err, resu) => {
                if (resu) {
                    resolve(resu[0].nome_loja)
                } else {
                    (reject('error'))
                }
            })
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

exports.updateStore = function (nome, url) {
    app.connection.query('update `loja` set `nome_loja` = ?, photoURL = ? WHERE `id_dono` = ?',
        [nome, url, firebase.auth().currentUser.uid], (err, resu) => {
            if (err) console.log(err)
            if (resu) console.log(resu)
        })
}

exports.addProduct = function () {
    app.connection.query
}
