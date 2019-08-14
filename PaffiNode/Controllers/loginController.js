const app = require('../config/config')
const model = require('../models/loginModel')
const firebase = require('../config/firebase')
var x = ''

exports.entrar = (req, res) => {
    if (!firebase.auth().currentUser) {
        res.render('index', {
            message: x
        });
        app.app.post('/', (req, res) => {
            model.logar(req.body.email, req.body.senha).then(() => {
                res.redirect('/home')
            })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        res.render('index', {
                            message: 'Senha incorreta.'
                        });
                    } else if (errorCode === 'auth/user-not-found') {
                        res.render('index', {
                            message: 'E-mail não cadastrado.'
                        });
                    } else {
                        res.render('index', {
                            message: 'Credenciais Incorretas.'
                        });
                    }
                })
        })
    } else {
        res.redirect('/home')
    }
}

exports.sair = (req, res) => {
    firebase.auth().signOut()
    res.redirect('/')
}