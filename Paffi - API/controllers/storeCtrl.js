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

exports.getProdutos = (req, res) => {
    model.getProdutos(req.body.id)
    .then((loja) =>{
        res.send(loja)
    })
}

exports.addProduto = (req, res) => {
    model.addProduct(req.body.nome, req.body.url, req.body.desc, req.body.cat, req.body.val, req.body.id_loja)
    .then((dado) =>{
        res.send(dado)
    })
}

exports.removeProduto = (req, res) => {
    model.removeProduto(req.body.id)
    res.send('sucess')
}