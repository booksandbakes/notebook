
var admin = require("firebase-admin");

var serviceAccount = require("C:/Users/Admin/Downloads/api-demo-2fe5b-firebase-adminsdk-iha68-7104938bb4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();

module.exports = { admin, db };