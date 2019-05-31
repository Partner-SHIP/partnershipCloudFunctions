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

// user, project
exports.getProjectMembers = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    const user = request.get("user");
    const project = request.get("project");
    const p = getProjectMembers(user, project);
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