const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function getProjectList(user, page, elem_per_page) {
    const p = (page === null) ? 0 : page;
    const promise = firebase.admin.firestore().doc(collections.alias.projects)
        .get()
        .then(
            (value) => {    
                var result = value.data()
                    .slice(elem_per_page * p, elem_per_page * (p + 1));
                return (result);
            },
            (rejectReason) => { return (null); }
        );
    return (promise);
}

exports.getProjectQueryResult = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    const tab = getProjectList(request.body.user, request.body.page, 20);
    result.value = tab;
    response.send(result);
});