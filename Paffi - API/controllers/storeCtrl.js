const model = require('../models/storeModel')

exports.pegaLojas = (req, res) => {
    model.getStores()
        .then((dado) => {
            res.status(200).send(dado)
        })
}

exports.attPerfil = (req, res) => {
    model.updateStore(req.body.uid, req.body.nome, req.body.url, req.body.descricao)
        .then((result) =>{
            res.status(200).send(result)
        })
}

exports.pegaLojaPorId = (req, res) => {
    model.getStoreById(req.body.uid)
    .then((loja) =>{
        res.status(200).send(loja)
    })
}

exports.getProdutos = (req, res) => {
    model.getProdutos(req.body.id)
    .then((loja) =>{
        res.status(200).send(loja)
    })
}

exports.addProduto = (req, res) => {
    model.addProduct(req.body.nome, req.body.url, req.body.desc, req.body.cat, req.body.val, req.body.id_loja)
    .then((dado) =>{
        res.status(200).send(dado)
    })
}

exports.updateProduto = (req, res) => {
    model.updateProduto(req.body.id ,req.body.nome, req.body.desc, req.body.val, req.body.cat, req.body.photoURL)
    .then((dado) => {
        res.status(200).send(dado)
    })
}

exports.removeProduto = (req, res) => {
    model.removeProduto(req.body.id)
    res.status(200).send({})
}

exports.realizaCompra = (req, res) => {
    model.realizaCompra(req.body.usuario, req.body.produtos, req.body.loja, req.body.local, req.body.datahora)
        .then(dado => {
            res.status(200).send(dado)
        })
}

exports.getPedidos = (req, res) => {
    model.getPedidos(req.body.id_loja)
    .then((pedidos) => {
        res.status(200).send(pedidos)
    })
}

exports.finalizaPedido = (req, res) => {
    model.finalizaPedido(req.body.id_compra)
    .then((result) => {
        res.status(200).send(result)
    })
}

exports.cancelaPedido = (req, res) => {
    model.cancelaPedido(req.body.id_compra)
    .then((result) => {
        res.status(200).send(result)
    })
}

exports.pegaHistorico = (req, res) => {
    model.pegaHistorico(req.body.id)
    .then((result) => {
        res.status(200).send(result)
    })
}

exports.countPedidos = (req, res) => {
    model.countPedidos(req.body.id)
    .then((data) => {
        res.status(200).send(data)
    })
}