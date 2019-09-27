module.exports = (app) => {

    //Controllers
    const cadastro = require('../controllers/cadastroCtrl')
    const loja = require('../controllers/storeCtrl')
    //Controllers

    //Cadastro
    app.post('/cadastraUsuario', cadastro.cadastrar)
    //Cadastro

    //Loja
    app.post('/pegaLojas', loja.pegaLojas)

    app.post('/atualizaLoja', loja.attPerfil)

    app.post('/buscaMinhaLoja', loja.pegaLojaPorId)

    app.post('/buscaLojaProduto', loja.getProdutos)

    app.post('/addProduto', loja.addProduto)

    app.post('/updateProduto', loja.updateProduto)

    app.post('/removeProduto', loja.removeProduto)
    //Loja

};
