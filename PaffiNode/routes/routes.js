module.exports = (app) => {
    var path = require('path');

    //Controllers
    var login = require('../Controllers/loginController')
    var cadastro = require('../Controllers/cadastroController')
    var store = require('../Controllers/storeController')
    //Controllers
    
    app.get('/', login.entrar)

    app.get('/cadastro', cadastro.cadastrar)

    app.get('/firstAcess', store.primeiroAcesso)

    app.get('/home', (req, res) =>{
        res.send('a')
    })

    app.get('/sair', login.sair)
};


