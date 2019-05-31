const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function pushMembershipSlot(project, tag) {
    const promise = firebase.admin.firestore().collection(collections.alias.membershipSlot)
    .add({
        project:project,
        tag:tag
    }).then((value) => {
        return (true);
    }).catch((error) => {
        return (false);
    });
    return (promise);
}

function projectMembers(project) {
    const promise = firebase.admin.firestore().collection(collections.alias.membership).where("projectid", "==", project).get()
    .then((projectMembers) => {
        if (projectMembers.docs.length === 0)
            return ([]);
        var result = [];
        projectMembers.docs.forEach((item) => {result.push(item.data())});
        return (result);
    }).catch((error) => {
        return ([]);
    });
    return (promise);
}

function isProjectAdmin(project, user) {
    const promise = projectMembers(project).then((members) => {
        var usermembership = [];
        members.forEach((item) => {
            if (item.uid === user)
                usermembership.push(item);
        });
        if (members.length === 0)
            return (false);
        if (members[0].isGroupAdmin === false)
            return (false);
        return (true);
    }).catch((error) => {
        return (false);
    })
    return (promise);
}

function postMembershipSlot(user, tag, project) {
    const promise = isProjectAdmin(project, user)
    .then((value) => {
        if (value === false)
            return (null);
        return (pushMembershipSlot(project, tag));
    }).catch((error) => {
        return (null);
    });
    return (promise);
}

// user, tag, project
exports.postMembershipSlot = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    const user = request.get("user");
    const tag = request.get("tag");
    const project = request.get("project");
    const p = postMembershipSlot(
        user,
        tag,
        project
    );
    p.then((pushpromise) => {
        if (pushpromise === null) {
            result.error = {value:"not allowed"};
            response.send(result);
            return (false)
        }
        if (pushpromise === false) {
            result.error = {value:"can't push"}
            response.send(result);
            return (false);
        }
        result.value = "success";
        response.send(result);
        return (true);
    }).catch((error) => {
        result.error = error;
        response.send(result);
        return (false);
    });
    return (true);
});