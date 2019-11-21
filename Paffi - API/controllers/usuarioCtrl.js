const model = require('../models/usuarioModel')

exports.getUser = (req, res) => {
    console.log(req.body.id)
    model.getUser(req.body.id)
    .then((user) =>{
        res.status(200).send(user)
    })
}

exports.attUsuario = (req, res) => {
    console.log(req.body)
    model.attUser(req.body.id ,req.body.nome, req.body.photoURL)
    .then((resp) => {
        res.status(200).send(resp)
    })
}

exports.getHistorico = (req, res) => {
    console.log(req.body)
    model.getHistorico(req.body.id)
    .then((historico) => {
        res.status(200).send(historico)
    })
}

exports.getProdutosHistorico = (req, res) => {
    model.getProdutosHistorico(req.body.id_compra)
    .then((produtos) => {
        res.status(200).send(produtos)
    })
}

