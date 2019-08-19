const app = require('../config/config')
const model = require('../models/storeModel')
const firebase = require('../config/firebase')

exports.loja = (req, res) => {
    if (!firebase.auth().currentUser) {
        res.redirect('/')
    } else {
        res.render('store', {
        });
    }
} 

exports.primeiroAcesso = (req, res) => {
    
}
    