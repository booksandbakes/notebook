const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyDUMLazc5OKrcwZ67ePe1PvHhE9-xYWnb8",
    authDomain: "api-demo-2fe5b.firebaseapp.com",
    projectId: "api-demo-2fe5b",
    storageBucket: "api-demo-2fe5b.appspot.com",
    messagingSenderId: "423840533995",
    appId: "1:423840533995:web:31f1d36005bbc9f1c2ddae",
    measurementId: "G-EERWPGR0YL"
  };
  
  // Initialize Firebase

firebase.initializeApp(firebaseConfig); //initialize firebase app 
//const db = firebase.firestore();
//const User = db.collection("Books");
//module.exports = User;
module.exports = { firebase }; //export the app
