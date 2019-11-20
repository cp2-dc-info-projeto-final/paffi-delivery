const model = require('../models/cadastroModel')

exports.cadastrar = (req, res) =>{
    model.cadastraBd(req.body.uid, req.body.email, req.body.nome,
         req.body.loja, req.body.nomeloja, req.body.url, req.body.descricao)
    .then((rs)=>{
        res.status(200).send({rs})
    })
}
