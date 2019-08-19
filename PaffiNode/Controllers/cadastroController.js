const app = require('../config/config')
const model = require('../models/cadastroModel')
const firebase = require('../config/firebase')

exports.cadastrar = (req, res) => {
    if (!firebase.auth().currentUser) {
        res.render('message', {
            layout: 'cadastroLayout',
            x: 'batat'
        });
        app.app.post('/cadastro', (req, res) => {
            if (req.body.email == req.body.confemail) {
                if (req.body.senha == req.body.confsenha) {
                    model.cadastrar(req.body.email, req.body.senha)
                        .then(() => {
                            model.cadastraBd(firebase.auth().currentUser.uid,
                            req.body.email,
                             req.body.nome + ' ' + req.body.sobrenome, 
                             req.body.vendedor)
                            res.redirect('/home')
                        })
                        .catch((error) => {
                            console.log(error)
                            if (error.code == 'auth/email-already-in-use') {
                                res.render('message', {
                                    layout: 'cadastroLayout',
                                    message: 'E-mail já cadastrado'
                                });
                            } else if (error.code == 'auth/weak-password') {
                                res.render('message', {
                                    layout: 'cadastroLayout',
                                    message: 'A senha precisa conter no mínimo 6 caracteres'
                                });
                            } else {
                                res.render('message', {
                                    layout: 'cadastroLayout',
                                    message: 'Dados inválidos'
                                });
                            }
                        })
                } else {
                    res.render('message', {
                        layout: 'cadastroLayout',
                        message: 'Senhas não conferem'
                    });
                }
            } else {
                res.render('message', {
                    layout: 'cadastroLayout',
                    message: 'E-mails não conferem'
                });
            }
        })
    } else {
        res.redirect('/home')
    }
}