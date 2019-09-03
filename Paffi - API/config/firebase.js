var firebase = require("firebase/app");
require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyCU162xBGghRaszmRllu4c9JdtzakJJyzM",
    authDomain: "paffi-tcc.firebaseapp.com",
    databaseURL: "https://paffi-tcc.firebaseio.com",
    projectId: "paffi-tcc",
    storageBucket: "paffi-tcc.appspot.com",
    messagingSenderId: "90869128650",
    appId: "1:90869128650:web:9fc2c7c03513c6de"
  };

firebase.initializeApp(firebaseConfig);
module.exports = firebase
