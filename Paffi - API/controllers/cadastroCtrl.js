const app = require('../config/config')
const model = require('../models/cadastroModel')
const firebase = require('../config/firebase')

exports.cadastrar = (req, res) =>{
    model.cadastraBd(req.body.uid, req.body.email, req.body.nome, req.body.loja, req.body.nomeloja)
    .then((rs)=>{
        res.send({result: rs})
    })
}