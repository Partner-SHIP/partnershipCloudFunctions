const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function membershipCandidatureAlreadyExist(user, membershipSlot) {
    const promise = firebase.admin.firestore().collection(collections.alias.pendingCandidature)
        .where("membershipSlot", "==", membershipSlot)
        .where("uid", "==", user)
        .get().then((value) => {
            if (value.size === 0)
                return (false);
            return (true);
        }).catch((error) => {
            return (true);
        });
    return (promise);
}

function postMembershipCandidature(user, membershipSlot) {
    const promise = membershipCandidatureAlreadyExist(user, membershipSlot).then((value) => {
        if (value === true) {
            return (null);
        }
        const toAdd = {
            membershipSlot: membershipSlot,
            uid: user
        };
        const pushpromise = firebase.admin.firestore().collection(collections.alias.pendingCandidature).add(toAdd)
            .then((value) => {
                return (true);
            }).catch((error) => {
                return (false);
            });
        return (pushpromise);
    }).catch((error) => {
        return (null);
    }).catch((error) => {
        return (null);
    })
    return (promise);
}

// user, membershipSlot
exports.postMembershipCandidature = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    const p = postMembershipCandidature(
        request.body.user,
        request.body.membershipSlot
    );
    p.then((pushpromise) => {
        if (pushpromise === null) {
            result.error = { value: "candidature already exist" };
            response.send(result);
            return (false);
        }
        if (pushpromise === true) {
            response.send({ value: "success" });
            return (true);
        }
        response.send({ error: "can't push candidature" });
        return (false);
    })
    .catch((error) => {
        result.error = error;
        response.send(error);
    });
});