const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function getMembershipSlot(project) {
    const promise = firebase.admin.firestore().collection(collections.alias.membershipSlot).where("project", "==", project).get()
    .then((value) => {
        var result = [];
        value.docs.forEach((elem) => {
            var item = elem.data();
            item.id = elem.id;
            result.push(item);
        })
        return (result);
    }).catch((error) => {
        return (null);
    });
    return (promise);
}

exports.getProjectMembers = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    const user = request.get("user");
    const project = request.get("project");
    const p = getMembershipSlot(user, project);
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