const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function getProjectMembers(user, project) {
    promise = firebase.admin.firestore().collection(collections.alias.membership).where("projectid", "==", project).get()
    .then((value) => {
        var result = [];
        value.docs.forEach((item) => {
            var toAdd = {};
            toAdd.isGroupAdmin = item.data().isGroupAdmin;
            toAdd.uid = item.data().uid;
            result.push(toAdd);
        })
        return (result);
    })
    .catch((error) => {
        return (error);
    });
    return (promise);
}

exports.getProjectMembers = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    const p = getProjectMembers(request.body.user, request.body.project);
    p.then((value) => {
        result.value = value;
        response.send(result);
        return (true);
    }).catch((error) => {
        result.error = error;
        response.send(result);
        return (false);
    });
    return (true);
});