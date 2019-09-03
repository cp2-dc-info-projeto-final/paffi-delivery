module.exports = (app) => {

    //Controllers
    var Jimp = require('jimp');
    const cadastro = require('../controllers/cadastroCtrl')
    const loja = require('../controllers/storeCtrl')
    //Controllers


    app.post('/cadastraUsuario', cadastro.cadastrar)

    app.post('/pegaLojas', loja.pegaLojas)

    app.post('/teste', (req, res) =>{
        var image = req.body.foto;
        console.log(image)

    })
};
