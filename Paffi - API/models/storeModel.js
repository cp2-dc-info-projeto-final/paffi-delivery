const app = require('../config/config')
const firebase = require('../config/firebase')

exports.getId = function () {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT `id_loja` FROM `loja` WHERE `id_dono` = ?', [firebase.auth().currentUser.uid], (err, resu) => {
            if (resu) {
                resolve(resu[0].id_loja)
            } else {
                (reject('error'))
            }
        })
    })
}

exports.getMyStoreName = function () {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM `loja` WHERE `id_dono` = ?', [firebase.auth().currentUser.uid], (err, resu) => {
            console.log(resu)
            if (resu[0]) {
                resolve(resu[0].nome_loja)
            } else {
                (resolve(false))
            }
        })
    })
}

exports.getStoreNameById = function (id) {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM `loja` WHERE `id_loja` = ?', [id], (err, resu) => {
            if (resu) {
                resolve(resu[0].nome_loja)
            } else {
                (reject('error'))
            }
        })
    })
}

exports.getMyStore = () => {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM `loja` WHERE `id_dono` = ?', [firebase.auth().currentUser.uid], (err, resu) => {
            if (resu) {
                resolve(resu[0])
            } else {
                resolve(false)
            }
        })
    })
}

exports.getStores = function () {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM `loja`', (err, resu) => {
            resolve(resu)
        })
    })
}


exports.getStoreById = function (id) {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM `loja` WHERE `id_dono` = ?', [id], (err, resu) => {
            console.log(resu)
            console.log(err)
            resolve(resu[0])
        })
    })
}

exports.updateStore = function (id, nome, url, descricao) {
    console.log(id, nome, url, descricao)
    return new Promise((resolve, reject) => {
        app.connection.query('update `loja` set `nome_loja` = ?, photoURL = ?, descricao = ? WHERE `id_dono` = ?', [nome, url, descricao, id], (err, resu) => {
            if (err) console.log(err)
            if (resu) resolve(resu)
        })
    })

}

exports.updateFotoLoja = function (url, uid) {

    return new Promise((resolve, reject) => {
        app.connection.query('update `loja` set photoURL = ? WHERE `id_dono` = ?', [url, uid], (err, resu) => {
            if (err) reject('erro')
            if (resu) resolve(true)
        })
    })
}


exports.addProduct = function (nome, url, desc, cat, val, id_loja) {
    console.log(val)
    return new Promise((resolve, reject) => {
        app.connection.query('INSERT INTO `produto`(nome, photoURL, descricao, categoria, valor, id_loja) values (?,?,?,?,?,?)',
            [nome, url, desc, cat, val, id_loja], (err, resu) => {
                if (err) reject(err)
                if (resu) resolve(resu)
            });
    })
}

exports.getProdutos = function (id) {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM `produto` WHERE id_loja = ?;',
            [id], (err, resu) => {
                if (err) resolve(err)
                if (resu) resolve(resu)
            })
    });
}

exports.updateProduto = function (id, nome, desc, val, cat, photoURL) {
    return new Promise((resolve, reject) => {
        app.connection.query('update `produto` set `nome` = ?, descricao = ?, valor = ?, categoria = ?, photoURL = ? WHERE `id_produto` = ?',
            [nome, desc, val, cat, photoURL, id], (err, resu) => {
                if (err) reject(err)
                if (resu) resolve(resu)
            });
    });
}

exports.removeProduto = function (id) {
    app.connection.query('DELETE FROM `produto` WHERE id_produto = ?',
        [id], (err, resu) => {
            if (resu) console.log('apagou')
            if (err) console.log('erro')
        })
}