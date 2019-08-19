var firebase = require('../config/firebase')
var _ = require('../config/config')

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

    }else{
        
    }
  })