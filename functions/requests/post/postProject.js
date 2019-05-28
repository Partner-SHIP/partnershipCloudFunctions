const firebase = require("../../firebase.js");
const collections = require("../../utils/utils.js").getCollections();

var createdProjectId = null;

function isUndefined(value) {
    if (value === null)
        return (true);
    if (typeof value === "undefined")
        return (true);
    return (false);
}

function parseLocation(projectLocation) {
    if (isUndefined(projectLocation))
        return (null);
    return (projectLocation);
}

function projectSyntaxing(name, description, logoPath, bannerPath, projectLocation) {
    if (isUndefined(name) || isUndefined(description) || isUndefined(logoPath) || isUndefined(bannerPath))
        return (null);
    var result = {
        name:name,
        description:description,
        logoPath:logoPath,
        bannerPath:bannerPath,
        dateOfCreation:firebase.admin.firestore.Timestamp.now(),
    };
    const testLocation = parseLocation(projectLocation);
    if (!isUndefined(testLocation) || testLocation === null)
        result.projectLocation = testLocation;
    return (result);
}

function canPostProject(project) {
    if (isUndefined(project))
        return (null)  ;
    var promise = firebase.admin.firestore().collection(collections.alias.projects).where("name", "==", project.name).get()
    .then((value) => {
        if (value.docs.length !== 0)
            return (false);
        return (true);
    }).catch((error) => {
        return (false);
    });
    return (promise);
}

function pushproject (data) {
    var result = firebase.admin.firestore().collection(collections.alias.projects).add(data)
    .then((value) => {
        createdProjectId = value.id;
        result = value;
        return (true);
    }).catch((rejected) => {
        return (rejected);
    });
    return (result);
}

function postProject(project) {
    const prevpromise = canPostProject(project);
    if (prevpromise === null)
        return (null);
    const promise = prevpromise
    .then((boolIsOkay) => {
        if (boolIsOkay === false)
            return (null);
        const data_to_push = {
            "bannerPath":project.bannerPath,
            "description":project.description,
            "logoPath":project.logoPath,
            "name":project.name,
            "dateOfCreation":project.dateOfCreation,
            "projectLocation":project.projectLocation,
        };
        var result = pushproject(data_to_push);
        return (result);
    })
    .catch((error) => {
        return (null);
    });
    return (promise);
}

function postOwnership(user) {
    var result = {
        dateOfMembership:firebase.admin.firestore.Timestamp.now(),
        isGroupAdmin:true,
        lastActivity:firebase.admin.firestore.Timestamp.now(),
        lastConnection:firebase.admin.firestore.Timestamp.now(),
        uid:user,
        projectid:createdProjectId,
    };
    var test = firebase.admin.firestore().collection(collections.alias.membership).add(result)
    .then((success) => {
        return (success);
    }).then((error) => {
        return (error);
    });
    return (test);
}

// user, name, description, logoPath, bannerPath, ?projectLocation
exports.postProject = firebase.functions.https.onRequest((request, response) => {
    var result = {};
    const p =   postProject(
                    projectSyntaxing(   request.body.name,
                                        request.body.description,
                                        request.body.logoPath,
                                        request.body.bannerPath,
                                        request.body.projectLocation)
                    );
    if (isUndefined(p)) {
        response.send({"error":"couldn't create project"});
        return (false);
    }
    p.then((resultValue) => {
            const p2 = postOwnership(request.body.user);
            p2.then((resultValue) => {
                result.value = resultValue;
                response.send(result);
                return (true);
            }).catch((reason) => {
                result.error = reason;
                response.send(result);
                return (false);
            });
            return (Promise.resolve(p2));
        },
        (reason) => {
            result.error = reason;
            response.send(result);
            return (false);
        })
    .catch((reason) => {
        result.error = reason;
        response.send(result);
        return (false);
    });
    return (true);
});
