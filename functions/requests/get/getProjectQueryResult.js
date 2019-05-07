const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function getProjectListQuery(user, query, page, elem_per_page) {
    const p = (page === null) ? 0 : page;
    const promise = firebase.admin.firestore().collection(collections.alias.projects)
        .get()
        .then(
            (value) => {
                var list = [];x
                var tmplist = value.docs.filter((value) => {return (value.data().name.includes(query));});
                tmplist.forEach((elem) => {
                    const item = elem.data();
                    list.push(item);
                }, list);
                list.slice(p * elem_per_page, (p + 1) * elem_per_page);
                return (list);
            },
            (rejectReason) => { return (null); }
        );
    return (promise);
}

function getProjectList(user, queryInput, page, elem_per_page) {
    const p = (page === null) ? 0 : page;
    if (queryInput != null && queryInput != "")
        return (getProjectListQuery(user, queryInput, page, elem_per_page));
    const promise = firebase.admin.firestore().collection(collections.alias.projects)
        .get()
        .then(
            (value) => {
                var list = [];
                value.docs.forEach((elem) => {
                    const item = elem.data();
                    list.push(item);
                }, list);
                list.slice(p * elem_per_page, (p + 1) * elem_per_page);
                return (list);
            },
            (rejectReason) => { return (null); }
        );
    return (promise);
}

exports.getProjectQueryResult = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    getProjectList(request.body.user, request.body.query, request.body.page, 20)
        .then((tab) => {
            result.value = tab;
            response.send(result);
            return (true);
        },
        (reason) => {
            result.error = reason;
            response.send(result);
            return (false);
        }
        )
        .catch((reason) => {
            result.error = reason;
            reason.send(result);
            return (false);
        });
});