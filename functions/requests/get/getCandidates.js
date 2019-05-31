const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();
const isUndefined = require("../../utils/utils").isUndefined();

function getProjectFromSlot(slot) {
    const promise = firebase.admin.app().firestore().collection(collections.alias.membershipSlot).doc(slot.replace("\n", "")).get()
    .then((value) => {
        if (!value.exists)
            return (null);
        return (value.data().project);
    }).catch((error => {
        return (null);
    }));
    return (promise);
}

function canGetCandidates(user, slot) {
    authorizationpromise = getProjectFromSlot(slot)
    .then((project) => {
        const canGetCandidatesPromise = firebase.admin.app().firestore().collection(collections.alias.membership).where("projectid", "==", project).where("uid", "==", user).get()
        .then((users) => {
            if (users.empty)
                return (false);
            var isAdmin = false;
            users.forEach((item) => {
                if (item.data().isGroupAdmin === true)
                    isAdmin = true;
            });
            return (isAdmin);
        })
        .catch((error) => {
            return (false);
        })
        return (canGetCandidatesPromise);
    }).catch((error) => {
        return (false);
    });
    return (authorizationpromise);
}

function doGetCandidates(slot) {
    const promise = firebase.admin.app().firestore().collection(collections.alias.pendingCandidature).where("membershipSlot", "==", slot).get()
    .then((value) => {
        var result = [];
        value.forEach((item) => {
            var topush = item.data();
            topush.id = item.id;
            result.push(topush);
        })
        return (result);
    })
    .catch((error) => {
        return (null);
    })
    return (promise);
}

function getCandidates(user, slot) {
    const authorizationpromise = canGetCandidates(user, slot)
    .then((value) => {
        if (value === false)
            return (null)
        return (doGetCandidates(slot));
    }).catch((error) => {
        return (null);
    })
    return (authorizationpromise);
}

exports.getCandidates = firebase.functions.https.onRequest((request, response) => {
    if (isUndefined(request.body.user) || isUndefined(request.body.membershipSlot)) {
        response.send({error:"invalid parameters"})
        return (false);
    }
    const promise = getCandidates(
        request.body.user,
        request.body.membershipSlot
    );
    promise.then((value) => {
        if (isUndefined(value)) {
            response.send({error:"can't get value"});
            return(false)
        }
        response.send({value:"success"});
        return (true);
    }).catch((error) => {
        response.send({error:"can't get value"});
        return (false);
    })
});