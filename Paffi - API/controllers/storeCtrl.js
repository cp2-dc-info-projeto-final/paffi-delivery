const app = require('../config/config')
const model = require('../models/storeModel')
const firebase = require('../config/firebase')

exports.pegaLojas = (req, res) => {
    model.getStores()
        .then((dado) => {
            res.send(dado)
        })
}

exports.attPerfil = (req, res) => {
    model.updateStore(req.body.uid, req.body.nome, req.body.url, req.body.descricao)
        .then((result) =>{
            res.send(result)
        })
}

exports.pegaLojaPorId = (req, res) => {
    model.getStoreById(req.body.uid)
    .then((loja) =>{
        res.send(loja)
    })
}