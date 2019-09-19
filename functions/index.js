const firebase = require("./firebase.js");
const requests = require("./requests/requests");
const triggers = require("./triggers/triggers");

firebase.admin.initializeApp();
const admin = require('firebase-admin');
const functions = require('firebase-functions');
let FieldValue = require('firebase-admin').firestore.FieldValue;

//admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

toExport = {};

for (x in requests) {
    toExport[x] = requests[x];
}

for (x in triggers) {
    toExport[x] = triggers[x];
}

for (i in toExport) {
    exports[i] = toExport[i];
}

/**
 * @api {get} https://us-central1-partnership-app-e8d99.cloudfunctions.net/getProjects2 getProjects2
 * @apiName getProjects2
 * @apiGroup User
 *
 * @apiParam {String} uid(optional) Users unique Uid (Optional).
 *
 * @apiSuccess {String} name.
 * @apiSuccess {String} description.
 * @apiSuccess {String} bannerPath .
 * @apiSuccess {String} projectLocation.
 * @apiSuccess {String} logoPath.
 * @apiSuccess {String} dateOfCreation.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      "bannerPath": "https://image.shutterstock.com/z/stock-vector-old-retro-video-game-background-classic-retro-style-game-design-scenery-1198191838.jpg",
 *      "name": "super mario remake",
 *     "projectLocation": null,
 *      "logoPath": "https://vignette.wikia.nocookie.net/wavisddlegend/images/b/b0/Sans_Undertale.png/revision/latest?cb=20180502200331",
 *      "dateOfCreation": {
 *           "_seconds": 1558890330,
 *           "_nanoseconds": 64000000
  *      },
 * "description": "Fane de Mario, j'ai commencé..."
 */
exports.getProjects = functions.https.onRequest((request, response) => {
    const Uid = request.query.uid;
    let promise = db.collection('projects').get()
        .then((snapshot) => {
            let id = [];
            snapshot.forEach((doc) => {
                console.log(doc.data());
                id.push( "uid : " + doc.id,doc.data());
                if (Uid === doc.id ) {
                    let tmp = [doc.data()];
                    return response.status(200).send(tmp);
                }
            });
            if (Uid !== undefined)
                return response.status(200).send("This profile does not exist");
            else
                return response.status(200).send((id));
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
    console.log('mon id est ', promise.id);
});

/**
 * @api {get} /user/:id Request projects information
 * @apiName getProfile2
 * @apiGroup User
 *
 * @apiParam {String} uid Users unique Uid(Optional).
 *
 * @apiSuccess {String} lastName.
 * @apiSuccess {String} firstName.
 * @apiSuccess {String} job .
 * @apiSuccess {String} cityLocation.
 * @apiSuccess {String} workLocation.
 * @apiSuccess {String} uid.
 * @apiSuccess {String} studies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *       "lastName": "Courneil",
 *       "firstName": "Lucas",
 *       "job": null,
 *       "cityLocation": null,
 *       "workLocation": null,
 *       "uid": "zcMrmxIc5HMfYE7eoCQsDWjbMZN2",
 *       "createdAt": {
 *           "_seconds": 1560510183,
 *           "_nanoseconds": 683000000
 *       },
 *       "studies": null
    }
 */
exports.getProfile2 = functions.https.onRequest((request, response) => {
    const Uid = request.query.uid;
    let promise = db.collection('profiles').get()
        .then((snapshot) => {
            let id = [];
            snapshot.forEach((doc) => {
                console.log(doc.data());
                id.push(doc.data());
                if (Uid === doc.id ) {
                    let tmp = [doc.data()];
                    return response.status(200).send(tmp);
                }
            });
            if (Uid !== undefined)
                return response.status(200).send("This profile does not exist");
            else
                return response.status(200).send(id);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
    console.log('mon id est ', promise.id);
});

/**
 * @api {post} /user/:id Request projects information
 * @apiName postNotification
 * @apiGroup User
 *
 * @apiParam {String} body Notification body.
 * @apiParam {String} title Notification title.
 *
 * @apiSuccess {String} lastName.
 * @apiSuccess {String} firstName.
 * @apiSuccess {String} job .
 * @apiSuccess {String} cityLocation.
 * @apiSuccess {String} workLocation.
 * @apiSuccess {String} uid.
 * @apiSuccess {String} studies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *       "lastName": "Courneil",
 *       "firstName": "Lucas",
 *       "job": null,
 *       "cityLocation": null,
 *       "workLocation": null,
 *       "uid": "zcMrmxIc5HMfYE7eoCQsDWjbMZN2",
 *       "createdAt": {
 *           "_seconds": 1560510183,
 *           "_nanoseconds": 683000000
 *       },
 *       "studies": null
    }
 */
exports.postNotification = functions.https.onRequest((request, response) => {
    // get the text parameter.
    if (request.method !== "POST") {
        return response.status(400).send("Invalide methode (POST)");
    }
    const body = request.query.body;
    const title = request.query.title;

    // creation of new documents
    var docRef = db.collection('notifications').doc();

    var setAda = docRef.set({
        body: body,
        title: title,
        isRead: false,
        uid : request.get("uid"),
        createdAt:firebase.admin.firestore.Timestamp.now()
    });
    return response.status(200).send("Création réussie");
});

/**
 * @api {post} https://us-central1-partnership-app-e8d99.cloudfunctions.net/postProject2  projects creation
 * @apiName postProject2
 * @apiGroup User
 *
 * @apiParam {String} body Notification body.
 * @apiParam {String} title Notification title.
 *
 * @apiSuccess {String} lastName.
 * @apiSuccess {String} firstName.
 * @apiSuccess {String} job .
 * @apiSuccess {String} cityLocation.
 * @apiSuccess {String} workLocation.
 * @apiSuccess {String} uid.
 * @apiSuccess {String} studies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *       Création réussie
 *  }
 */
exports.postProject2 = functions.https.onRequest((request, response) => {
    // get the text parameter.

    //if (request.method !== "POST") {
      //  return response.status(400).send("Invalide methode (POST)");
    //}

    let bannerPath = request.query.bannerPath;
    let logoPath = request.query.logoPath;
    const description = request.query.description;
    const name = request.query.name;
    const projectLocation = request.query.projectLocation;
    const uid = request.get("uid")
    if (uid === undefined)
    return response.status(400).send("You need to be logged");


    if (bannerPath === undefined)
        bannerPath = "https://vignette.wikia.nocookie.net/wavisddlegend/images/b/b0/Sans_Undertale.png/revision/latest?cb=20180502200331"
    if (logoPath === undefined)
        logoPath = "https://vignette.wikia.nocookie.net/wavisddlegend/images/b/b0/Sans_Undertale.png/revision/latest?cb=20180502200331"
    // creation of new documents
    var docRef = db.collection('projects').doc();

    var setAda = docRef.set({
        bannerPath: bannerPath,
        logoPath: logoPath,
        description: description,
        name : name,
        creator : request.get("uid"),
        dateOfCreation:firebase.admin.firestore.Timestamp.now()
    });
    return response.status(200).send("Création réussie");
});

/**
 * @api {post} https://us-central1-partnership-app-e8d99.cloudfunctions.net/postProfiles  profile creation and update
 * @apiName postProfiles
 * @apiGroup User
 *
 * @apiParam {String} body Notification body.
 * @apiParam {String} title Notification title.
 *
 * @apiSuccess {String} lastName.
 * @apiSuccess {String} firstName.
 * @apiSuccess {String} job .
 * @apiSuccess {String} cityLocation.
 * @apiSuccess {String} workLocation.
 * @apiSuccess {String} uid.
 * @apiSuccess {String} studies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *      Création réussie
    }
 */
exports.postProfiles = functions.https.onRequest((request, response) => {
    // get the text parameter.
    if (request.method !== "POST") {
        return response.status(400).send("Invalide methode (POST)");
    }
    let firstName = request.query.firstName;
    let lastName = request.query.lastName;
    let cityLocation = request.query.cityLocation;
    let workLocation = request.query.workLocation;
    let job = request.query.job;
    let studies  = request.query.studies;
    const uid = request.get("uid");
    if (uid === undefined)
        return response.status(200).send("You need to be logged");
    if (firstName === undefined)
        firstName = null
    if (lastName === undefined)
        lastName = null
    if (cityLocation === undefined)
        cityLocation = null
    if (workLocation === undefined)
        workLocation = null
    if (job === undefined)
        job = null
    if (studies === undefined)
        studies = null

    // creation of new documents
    var docRef = db.collection('profiles').doc(uid);

    var setAda = docRef.set({
        firstName: firstName,
        lastName: lastName,
        cityLocation: cityLocation,
        workLocation: workLocation,
        job: job,
        studies: studies,
        uid : uid,
        createdAt:firebase.admin.firestore.Timestamp.now()
    });
    return response.status(200).send("Création réussie");
});


exports.addTag = functions.https.onRequest((request, response) => {
    const uid = request.query.uid;
    const tag = request.query.tag;
    var docRef = db.collection('projects').doc(uid);
    if  (request.method === "DELETE") {
        docRef.update({
            tag: FieldValue.delete()
        });
        return response.status(200).send("Suprresion réussie");
    }
    else
    {
  docRef.update({
        tag: tag
    });
    return response.status(200).send("Création réussie");
    }
});

exports.Like = functions.https.onRequest((request, response) => {
    const uid = request.query.uid;
    const projectUid = request.query.projectUid;
    let promise = db.collection('projects').get()
    .then((snapshot) => {
        let id = [];
        snapshot.forEach((doc) => {
            console.log(doc.data());
            id.push( "uid : " + doc.id,doc.data());
            if (projectUid === doc.id ) {
                if (doc.data().likeUid.indexOf(uid) !== -1)
                {
                    console.log('doc.data().likeUid','reponseuid')
                    return response.status(200).send("Vous aimez deja ce projet");
                }
                else
                {    
                let tmp = [doc.data()];
                var docRef = db.collection('projects').doc(projectUid);
                docRef.update({
                likeNumber: doc.data().likeNumber + 1,
                likeUid : admin.firestore.FieldValue.arrayUnion(uid)
                });
                return response.status(200).send(tmp);
              }
            }
        });
        if (projectUid !== undefined)
           return response.status(200).send("This projects does not exist");
        else
        {
            return response.status(200).send("Création projects réussie");
        }
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
  
});

exports.Unlike = functions.https.onRequest((request, response) => {
    const uid = request.query.uid;
    const projectUid = request.query.projectUid;
    let promise = db.collection('projects').get()
    .then((snapshot) => {
        let id = [];
        snapshot.forEach((doc) => {
            console.log(doc.data());
            id.push( "uid : " + doc.id,doc.data());
            if (projectUid === doc.id ) {
                if (doc.data().likeUid.indexOf(uid) !== -1)
                {
                    let tmp = [doc.data()];
                    var docRef = db.collection('projects').doc(projectUid);
                    docRef.update({
                    likeNumber: doc.data().likeNumber + 1,
                    likeUid : admin.firestore.FieldValue.arrayRemove(uid)
                    });
                    return response.status(200).send(tmp);
                }
                else
                {    
                console.log('doc.data().likeUid','reponseuid')
                return response.status(200).send("Vous n'aimez pas ce projet");
              }
            }
        });
        if (projectUid !== undefined)
           return response.status(200).send("This projects does not exist");
        else
        {
            return response.status(200).send("Création projects réussie");
        }
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
  
});