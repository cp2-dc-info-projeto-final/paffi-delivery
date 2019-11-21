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
        });
}

exports.realizaCompra = function (usuario, produtos, loja, local, datahora) {
    return new Promise((resolve, reject) => {
        let preco = 0;
        produtos.forEach(produto => {
            preco += produto.valor
        })
        app.connection.query('INSERT INTO `compra`(valor_compra, data_compra, hora_compra, id_usuario, local, id_loja) values (?,?,?,?,?,?)',
            [preco, datahora.data, datahora.hora, usuario, local, loja], (err, resu) => {
                console.log(err)
                let idCompra = resu.insertId
                produtos.forEach(produto => {
                    app.connection.query('INSERT INTO `compra_produto`(id_produto, id_compra) values (?,?)',
                        [produto.id_produto, idCompra], (err2, resu2) => {
                            (resu2) ? resolve({ success: true }) : resolve(err2);
                        })
                })
            });
    });
}

exports.getPedidos = function (id) {
    return new Promise((resolve, reject) => {
        console.log(id);
        app.connection.query('SELECT c.*, u.nome, u.photoURL FROM compra as c join usuario as u ON u.id_usuario = c.id_usuario WHERE c.id_loja = ? AND c.finalizada IS NULL ORDER BY c.hora_compra DESC',
            [id], (err, resu) => {
                console.log(resu);
                (resu) ? resolve(resu) : resolve(err);
            })
    })
}

exports.finalizaPedido = function (id) {
    return new Promise((resolve, reject) => {
        app.connection.query('UPDATE `compra` set `finalizada` = 1 WHERE `id_compra` = ?',
            [id], (err, resu) => {
                (resu) ? resolve(resu) : resolve(err);
            })
    })
}

exports.cancelaPedido = function (id) {
    return new Promise((resolve, reject) => {
        app.connection.query('UPDATE `compra` set `finalizada` = 0 WHERE `id_compra` = ?',
            [id], (err, resu) => {
                (resu) ? resolve(resu) : resolve(err);
            })
    })
}

exports.pegaHistorico = function (id) {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT DISTINCT c.valor_compra, c.data_compra, c.hora_compra, c.id_compra, u.nome FROM compra AS c JOIN compra_produto as cp on cp.id_compra = c.id_compra JOIN usuario as u on c.id_usuario = u.id_usuario WHERE c.id_loja = ? AND c.finalizada = 1 ORDER BY c.hora_compra DESC',
            [id], (err, resu) => {
                (resu) ? resolve(resu) : resolve(err);
            })
    })
}

exports.countPedidos = function (id) {
    console.log(id, '<==== ID')
    return new Promise((resolve, reject) => {
        let result = {};
        app.connection.query('select count(*) as dado from compra WHERE finalizada = 1 and id_loja = ?',
            [id], (err, resu) => {
                result.finalizada = resu[0].dado
                app.connection.query('select count(*) as dado from compra WHERE finalizada = 0 and id_loja = ?',
                    [id], (err, resu1) => {
                        result.cancelada = resu1[0].dado
                        app.connection.query('select count(*) as dado from compra WHERE finalizada is null and id_loja = ?',
                            [id], (err, resu2) => {
                                result.andamento = resu2[0].dado
                                resolve(result)
                            })
                    })
            })
    })
}