const firebase = require("../firebase");

exports.helloWorld = firebase.functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
