const firebase = require('../config/firebase')
const app = require('../config/config')

const cadastro = function(email, senha) {
    return firebase.auth().createUserWithEmailAndPassword(email, senha)
}


const cadastraBd = function(uid, email, nome, loja, nomeloja, url, descricao){
    console.log(url, descricao)
    return new Promise((resolve, reject) => {
        app.connection.query('INSERT INTO `usuario`(id_usuario, email, nome, photoURL) values (?,?,?,?)',
        [uid, email, nome, 'https://firebasestorage.googleapis.com/v0/b/paffi-tcc.appspot.com/o/user.png?alt=media&token=1f00508e-a0d3-4d32-a8a1-320c8c95736a'], (err, result) => {
            if (loja == true) {
                app.connection.query('INSERT INTO `loja`(id_dono, nome_loja, photoURL, descricao) values (?,?,?,?)',
                    [uid, nomeloja, url, descricao], (err, result1) => {
                        console.log(result1.insertId)
                        if(result) resolve(result1.insertId)
                        if(err) console.log(err)
                    })
            }else {
                resolve(true)
            }
        })
    })
}

module.exports.cadastraBd = cadastraBd
module.exports.cadastrar = cadastro
