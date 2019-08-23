const app = require('../config/config')
const model = require('../models/storeModel')
const firebase = require('../config/firebase')

exports.loja = (req, res) => {
    if (!firebase.auth().currentUser) {
        res.redirect('/')
    } else {
        console.log(model.getMyStore())
        res.render('store', {
        });
    }
}

exports.primeiroAcesso = (req, res) => {
    model.getMyStoreName().then((dado) => {
        if (!dado) {
            res.render('firstAcess', {
            })
            app.app.post('/firstAcess', (req, res) => {
                model.updateStore(req.body.nome, req.body.foto)
                res.redirect('/home')
            })
        } else {
            res.redirect('/home')
        }
    })
}
