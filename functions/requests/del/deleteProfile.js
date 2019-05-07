
const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function deleteProfile(user, profile) {
    const promise = firebase.functions.storage
    return (promise);
}

exports.deleteProfile = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    deleteProfile(request.body.user, request.body.profile).then((resultValue) => {
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
