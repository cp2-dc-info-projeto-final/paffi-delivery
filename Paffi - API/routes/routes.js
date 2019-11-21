module.exports = (app) => {

    //Controllers
    const usuario = require('../controllers/usuarioCtrl');
    const cadastro = require('../controllers/cadastroCtrl');
    const loja = require('../controllers/storeCtrl');
    //Controllers

    //Cadastro
    app.post('/cadastraUsuario', cadastro.cadastrar);
    //Cadastro

    //Usuario
    app.post('/pegaUsuario', usuario.getUser);

    app.post('/atualizaUsuario', usuario.attUsuario);

    app.post('/pegaHistorico', usuario.getHistorico);

    app.post('/pegaProdutoHistorico', usuario.getProdutosHistorico);
    //Usuario

    //Loja
    app.post('/pegaLojas', loja.pegaLojas);

    app.post('/atualizaLoja', loja.attPerfil);

    app.post('/buscaMinhaLoja', loja.pegaLojaPorId);

    app.post('/buscaLojaProduto', loja.getProdutos);

    app.post('/addProduto', loja.addProduto);

    app.post('/updateProduto', loja.updateProduto);

    app.post('/removeProduto', loja.removeProduto);
    
    app.post('/realizaCompra', loja.realizaCompra);
    
    app.post('/getPedidos', loja.getPedidos);

    app.post('/pegaHistoricoLoja', loja.pegaHistorico)

    app.post('/finalizaPedido', loja.finalizaPedido);

    app.post('/cancelaPedido', loja.cancelaPedido);

    app.post('/countPedidos', loja.countPedidos)

    app.post('/mudaStatus', loja.mudaStatus)
    //Loja

};
