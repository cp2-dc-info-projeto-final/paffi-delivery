module.exports = (app) => {

    //Controllers
    const cadastro = require('../controllers/cadastroCtrl')
    const loja = require('../controllers/storeCtrl')
    //Controllers


    app.post('/cadastraUsuario', cadastro.cadastrar)

    app.post('/pegaLojas', loja.pegaLojas)

    app.post('/atualizaLoja', loja.attPerfil)

    app.post('/buscaMinhaLoja', loja.pegaLojaPorId)

    app.post('/buscaLojaProduto', loja.getProdutos)

    app.post('/addProduto', loja.addProduto)

    app.post('/teste', (req, res) =>{
        var image = req.body.foto;
    })

};
