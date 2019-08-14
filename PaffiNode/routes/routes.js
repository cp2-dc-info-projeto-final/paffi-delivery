module.exports = (app) => {
    var path = require('path');

    //Controllers
    var login = require('../Controllers/loginController')
    //Controllers
    
    app.get('/', login.entrar)

    app.get('/home', (req, res) =>{
        res.send('aaa')
    })


    app.get('/sair', login.sair)
};


