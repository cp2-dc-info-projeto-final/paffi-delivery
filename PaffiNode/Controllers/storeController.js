const app = require('../config/config')
const model = require('../models/cadastroModel')
const firebase = require('../config/firebase')
const mysql = require('mysql2')
var id = ''
let i = 0
exports.loja = (req, res) => {
    if (!firebase.auth().currentUser) {
        res.redirect('/')
    } else {
        res.render('store', {
        });
    }
} 
    