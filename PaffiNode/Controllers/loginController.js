const app = require('../config/config')
const model = require('../models/loginModel')
const firebase = require('../config/firebase')
const handle = require('handlebars')
var x = ''

exports.entrar = (req, res) => {
    if (!firebase.auth().currentUser) {
        res.render('message', {
            layout: 'loginLayout',
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
                        res.render('message', {
                            layout: 'loginLayout',
                            message: 'Senha incorreta.'
                        });
                    } else if (errorCode === 'auth/user-not-found') {
                        res.render('message', {
                            layout: 'loginLayout',
                            message: 'E-mail não cadastrado.'
                        });
                    } else {
                        res.render('message', {
                            layout: 'loginLayout',
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