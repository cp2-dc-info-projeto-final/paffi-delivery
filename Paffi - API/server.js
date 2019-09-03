const _ = require('./config/config.js')
const firebase = require('./config/firebase.js')


const loja = require('./models/storeModel')
loja.getStores().then((dado)=>console.log(dado))