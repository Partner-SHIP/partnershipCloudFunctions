const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

function isUndefined(value) {
    if (value === null)
        return (true);
    if (typeof value === "undefined")
        return (true);
    return (false);
}

function pushMembership(useridtoadd, project) {
    const data_to_push = {
        projectid:project,
        uid:useridtoadd,
        isGroupAdmin:false,
        lastActivity:firebase.admin.firestore.Timestamp.now(),
        lastConnection:firebase.admin.firestore.Timestamp.now(),
    };
    const promise = firebase.admin.firestore().collection(collections.alias.membership).add(data_to_push).then((value) => {
        return (true);
    }).catch((error) => {return (false);})
    return (promise);
}


function acceptCandidature(candidatureid) {
    const promise = firebase.admin.firestore().collection(collections.alias.pendingCandidature).doc(candidatureid).get()
    .then((candidature) => {
        const c = candidature.data();
        if (isUndefined(c.membershipSlot) || isUndefined(c.uid))
            return (false);
        const useridtoadd = c.uid;
        const pushpromise = firebase.admin.firestore().collection(collections.alias.membershipSlot).doc(c.membershipSlot.replace("\n", "")).get()
        .then((slot) => {
            if (!slot.exists)
                return (false);
            const s = slot.data();
            if (isUndefined(s.project))
                return (false);
            const result = pushMembership(useridtoadd, s.project).then((pushsuccess) => {
                if (pushsuccess === false)
                    return (false);
                const membershipslotslot = firebase.admin.firestore().collection(collections.alias.pendingCandidature).where("membershipSlot", "==", slot.id.replace("\n", "")).get()
                .then((list) => {
                    var promisesList = [];
                    list.forEach((item) => {
                        promisesList.push(firebase.admin.firestore().collection(collections.alias.pendingCandidature).doc(item.id.replace("\n", "")).delete()
                        .then((deletionresult) => {return (true);}).catch((error) => {return (false);}));
                    })
                    const result = Promise.all(promisesList).then((values) => {
                        if (values === null || values.length === 0)
                            return (true);
                        if (values.includes(false))
                            return (false);
                        return (true);
                    });
                    return (Promise.resolve(result));
                }).catch((error) => {return (false);})
                return (membershipslotslot);
            }
            ).catch((error) => {return (false);}).catch((error) => {return (false);})
            return (result);
        }).catch((error) => {return (false);})
        return (pushpromise);
    }).catch((error) => {return (false);});
    return (promise);
}

function rejectCandidature(candidature) {
    const promise = firebase.admin.firestore().collection(collections.alias.pendingCandidature).doc(candidature).delete()
    .then((value) => {
        return (true);
    }).catch((error) => {
        return (false);
    });
    return (promise);
}

function updateMembershipSlot(candidature, accepted) {
    if (accepted === true || accepted === 'true') {
        return (acceptCandidature(candidature));
    }
    if (accepted === false || accepted === 'false') {
        return (rejectCandidature(candidature));
    }
    return (false);
}

function getSlotOfCandidature(candidature) {
    candidature = candidature.replace("\n", "");
    const promise = firebase.admin.firestore().collection(collections.alias.pendingCandidature).doc(candidature).get()
    .then((value) => {
        if (!value.exists)
            return (null);
        const candidature = value.data();
        if (isUndefined(candidature.membershipSlot))
            return (null);
        return (candidature.membershipSlot);
    }).catch((error) => {
        return (null);
    });
    return (promise);
}

function getProjectOfMembershipSlot(slot) {
    slot = slot.replace("\n", "");
    const promise = firebase.admin.firestore().collection(collections.alias.membershipSlot).doc(slot).get()
    .then((value) => {
        if (!value.exists) {
            return (null);
        }
        const slotdata = value.data();
        if (isUndefined(slotdata.project))
            return (null);
        return (slotdata.project);
    })
    .catch((error) => {
        return (null);
    });
    return (promise);
}

function getAdminsOfProject(project) {
    const promise = firebase.admin.firestore().collection(collections.alias.membership).where("projectid", "==", project).get()
    .then((value) => {
        if (value.empty)
            return ([]);
        var result = [];
        value.docs.forEach((item) => {
            const itemdata = item.data();
            if (itemdata.isGroupAdmin === true)
                result.push(itemdata.uid);
        });
        return (result);
    }).catch((error) => {
        return ([]);
    });
    return (promise);
}

function canUserAnwserCandidature(user, candidature) {
    const presult = getSlotOfCandidature(candidature).then((slot) => {
        if (slot === null) {return (false);}
        const p1 = getProjectOfMembershipSlot(slot)
        .then((project) => {
            if (project === null) {return (false);}
            const p2 = getAdminsOfProject(project)
            .then((admins) => {
                if (admins === null)
                    return (false);
                if (admins.includes(user))
                    return(true);
                return (false);
            }).catch((error) => {return (false);});
            return (p2);
        }).catch((error) => {return (false);});
        return (p1);
    }).catch((error) => {return (false);});
    return (presult);
}

function postAnswerCandidature(user, candidature, accepted) {
    const promise = canUserAnwserCandidature(user, candidature)
    .then((value) => {
        if (value === false)
            return (null);
        return (updateMembershipSlot(candidature, accepted));
    })
    .catch((error) => {
        return (null);
    });
    return (promise);
}

// user, candidature, accepted
exports.postAnswerCandidature = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    const user = request.get("user");
    const candidature = request.get("candidature");
    const accepted = request.get("accepted");
    const p = postAnswerCandidature(
        user,
        candidature,
        accepted
    );
    if (p === null) {
        console.log("not allowed")
        response.send({error:"not allowed"});
        return (false);
    }
    p.then((updatePromise) => {
        if (updatePromise === null) {
            console.log("can't push");
            response.send({error:"can't push"})
            return (false);
        }
        response.send({value:"success"});
        return (true);
    }).catch((error) => {
        console.log("error here", error);
        response.send({error:error});
        return (false);
    });
    return (Promise.resolve(p));
});