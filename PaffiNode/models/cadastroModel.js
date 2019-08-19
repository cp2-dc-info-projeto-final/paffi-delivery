const firebase = require('../config/firebase')
const app = require('../config/config')

const verify = function verify() {
    if (firebase.auth().currentUser) {
        return true
    } else {
        return false
    }
}

const cadastro = function(email, senha) {
    return firebase.auth().createUserWithEmailAndPassword(email, senha)
}


const cadastraBd = function(uid, email, nome, loja){
    console.log(uid, nome, loja)
    firebase.auth().currentUser.updateProfile({
        displayName: (nome)
    })
    app.connection.query('INSERT INTO `usuario`(id_usuario, email, nome) values (?,?,?)',
    [uid, email, nome], (err, result) => {
        if (loja == 'sim') {
            app.connection.query('INSERT INTO `loja`(id_dono) values (?)',
                [uid], (err, result) => {
                    if(result) console.log('sucesso')
                })
        }
    })
}

module.exports.cadastraBd = cadastraBd
module.exports.cadastrar = cadastro
module.exports.verificaLogin = verify