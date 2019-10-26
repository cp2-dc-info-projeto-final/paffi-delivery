const app = require('../config/config')
const model = require('../models/usuarioModel')
const firebase = require('../config/firebase')

exports.getUser = (req, res) => {
    console.log(req.body.id)
    model.getUser(req.body.id)
    .then((user) =>{
        res.send(user)
    })
}
