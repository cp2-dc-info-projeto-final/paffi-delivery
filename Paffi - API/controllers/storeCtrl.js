const app = require('../config/config')
const model = require('../models/storeModel')
const firebase = require('../config/firebase')

exports.pegaLojas = (req, res) => {
    model.getStores()
        .then((dado) => { 
            res.send(dado)
        })
}