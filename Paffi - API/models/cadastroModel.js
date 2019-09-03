const firebase = require('../config/firebase')
const app = require('../config/config')

const cadastro = function(email, senha) {
    return firebase.auth().createUserWithEmailAndPassword(email, senha)
}


const cadastraBd = function(uid, email, nome, loja, nomeloja){
    return new Promise((resolve, reject) => {
        app.connection.query('INSERT INTO `usuario`(id_usuario, email, nome) values (?,?,?)',
        [uid, email, nome], (err, result) => {
            if (loja == true) {
                app.connection.query('INSERT INTO `loja`(id_dono, nome_loja) values (?,?)',
                    [uid, nomeloja], (err, result) => {
                        if(result) resolve(true)
                        if(err) console.log(err)
                    })
            }
        })
    })
}

module.exports.cadastraBd = cadastraBd
module.exports.cadastrar = cadastro
