const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function getProject(user, project) {
    const promise = firebase.admin.firestore().collection(collections.alias.projects)
        .get()
        .then(
            (value) => {
                var result = value.docs.find((elem) => {
                    return (elem.data.uid === project);
                })
                if (!result) {   
                    return (null);
                }
                return (result.data());
            },
            (rejectReason) => { return (null); }
        );
    return (promise);
}

exports.getProject = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    const user = request.get("user");
    const project = request.get("project");
    getProject(user, project).then((resultValue) => {
        result.value = resultValue;
        response.send(result);
        return (true);
    },
    (reason) => {
        result.error = reason;
        response.send(reason);
        return (false);
    }).catch((reason) => {
        result.error = reason;
        reason.send(result);
        return (false);
    });
});
