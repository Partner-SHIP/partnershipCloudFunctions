const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function getProfile(user) {
    if (user === null)
        return (null);
    const promise = firebase.admin.firestore().collection(collections.alias.profiles)
        .get()
        .then(
            (value) => {
                var result = value.docs.find((elem) => {
                    return (elem.data.uid === user);
                })
                if (!result) {
                    return(null);
                }
                return (result.data());
            },
            (rejectReason) => { return (null); }
        );
    return (promise);
}

exports.getProfile = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    const user = request.get("profile");
    getProfile(user).then((resultValue) => {
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
