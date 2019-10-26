const app = require('../config/config')
const firebase = require('../config/firebase')

exports.getUser = function (id) {
    return new Promise((resolve, reject) => {
        app.connection.query('SELECT * FROM `usuario` WHERE id_usuario = ?',
        [id], (err, resu) => {
            console.log(resu);
            (resu) ? resolve(resu[0]) : reject(err)
        })
    })
}