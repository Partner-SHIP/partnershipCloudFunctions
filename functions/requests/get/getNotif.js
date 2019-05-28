const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function getProjectListQuery(user, page, elem_per_page) {
    const p = (page === null) ? 0 : page;
    const promise = firebase.admin.firestore().collection(collections.alias.notifications)
        .get()
        .then(
            (value) => {
                var list = [];
                var tmplist = value.docs.filter((value) => {return (value.data().userId === user);});
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

function getNotifList(user, page, elem_per_page) {
    const p = (page === null) ? 0 : page;
        return (getProjectListQuery(user, page, elem_per_page));
}

//user page
exports.getNotif = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    getNotifList(request.body.user, request.body.page, 20)
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