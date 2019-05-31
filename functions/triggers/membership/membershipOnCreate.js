const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();
const isUndefined = require("../../utils/utils").isUndefined();

const membershipOnCreatePath = collections.alias.membership + "/{membershipId}"

function sendNotif(projectName, target) {
    const toPush = {
        userId:target,
        body:"Vous avez été ajouté au projet : " + projectName,
        title:"Nouveau Projet",
        timestamp:firebase.admin.firestore.Timestamp.now(),
        isRead:false,
    };
    firebase.admin.app().firestore().collection(collections.alias.notifications).add(toPush)
    .then((value)=>{return (true)})
    .catch((error)=>{return (false)});
}

function getProjectNamePromise(projectid) {
    const promise = firebase.admin.app().firestore().collection(collections.alias.projects).doc(projectid).get()
    .then((projectfields) => {
        if (!projectfields.exists)
            return (null);
        return (projectfields.data().name);
    }).catch((error) => {
        return (null);
    });
    return (promise);
}

exports.membershipOnCreate = firebase.functions.firestore.document(membershipOnCreatePath).onCreate((snapshot, context) => {
    const newValue = snapshot.data();
    const getnameresult = getProjectNamePromise(newValue.projectid)
    .then((name) => {
        if (!isUndefined(name)) {
            sendNotif(name, newValue.uid);
            return (true);
        }
        return (false)
    }).catch((error) => {
        return (false);
    });
    return (getnameresult);
});