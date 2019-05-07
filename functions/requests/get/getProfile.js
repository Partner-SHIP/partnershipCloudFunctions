const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function getProfile(user, profile) {
    console.log("parameters,", user, "\n", profile);
    if (profile == null) 
        throw Error("Invalid Body");
    const promise = firebase.admin.firestore().collection(collections.alias.profiles)
        .get()
        .then(
            (value) => {
                var result = value.docs.find((elem) => {
                    return (elem.data.uid === profile);
                })
                if (result == null) {   
                    throw Error("No Entry Found");
                }
                return (result.data());
            },
            (rejectReason) => { return (null); }
        );
    return (promise);
}

exports.getProfile = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    getProfile(request.body.user, request.body.profile).then((resultValue) => {
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
