const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();


exports.putRedNotification = firebase.functions.https.onRequest((request, response) => {
    const notif = request.get("notif");
    const promise = firebase.admin.firestore().collection(collections.alias.notifications).doc(notif).get()
    .then((doc) => {
        var data = doc.data();
        data.isRead = true;
        const putpromise = firebase.admin.firestore().collection(collections.alias.notifications).doc(notif).update(data)
        .then((value) => {response.send({value:"success"});return (true)})
        .catch((error) => {response.send({error:"can't update notification"});return (false)})
        return(Promise.resolve(putpromise));
    }).catch((error) => {
        response.send({error:"notification doesn't exist"});
        return (false);
    });
    return (promise);
});