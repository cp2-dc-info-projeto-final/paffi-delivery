const firebase = require('../config/firebase')
const verify = function verify(){
    if(firebase.auth().currentUser){
        return true
    }else{
        return false
    }
}

const login = function logar(email, senha){
    return firebase.auth().signInWithEmailAndPassword(email, senha)
}

module.exports.logar = login
module.exports.verificaLogin = verify