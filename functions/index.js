

const functions = require('firebase-functions');
//const key = functions.config().stripe.key;
const admin = require('firebase-admin');
//const collectionsList = require('collections');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const collectionsList = {
    membership:"membership",
    profiles:"profiles",
    users:"users",
    projects:"projects"
};

function isEmptyObject(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return (false);
    }
    return (true);
}

function isValidToken(token, informationToAccess) {
    const promise = admin.firestore().doc(collectionsList.users).get();
    const p2 = promise.then(
        (value) => {
            // TODO: check if token is contained into value
            console.log("DEBUG ISVALIDTOKEN ONSUCCESS", value);
            return (true);
        },
        (rejectReason) => {
            console.log("DEBUG ISVALIDTOKEN REJECTED", rejectReason);
            return (false);
        }
    );
    return (p2);
}

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

function ProjectLine(uid, name, bannerPath, logoPath) {
    var result = {};
    result.uid = uid;
    result.name = name;
    result.bannerPath = bannerPath;
    result.logoPath = logoPath;
    return (result);
}

function getProjectList(user, page, elem_per_page) {
    const p = (page === null) ? 0 : page;
    const promise = admin.firestore().doc(collectionsList.projects).get();
    const p2 = promise.then(
        (value) => {
            // TODO: check if token is contained into value
            console.log("DEBUG ISVALIDTOKEN ONSUCCESS", value);
            var result = value.data();
            result = result.slice(elem_per_page * p, elem_per_page * (p + 1));
            return (result);
        },
        (rejectReason) => {
            console.log("DEBUG ISVALIDTOKEN REJECTED", rejectReason);
            return (null);
        }
    );
    return (p2);
}

exports.searchProject = functions.https.onRequest((request, response) => {
    var result = {};
    const errorResult = {error:"Undefined"};
    if (request === null || request.body === null || isEmptyObject(request.body))
        response.send(errorResult);
    else
    {
        if (!isValidToken(request.body.token, null))
            response.send(errorResult);
        else {
            const tab = getProjectList(request.body.user, request.body.page, 20);
            result.value = tab;
            response.send(result);
        }
    }
});

function storyLine(title, description, bannerPath, logoPath) {
    var result = {};
    result.title = title;
    result.description = description;
    result.bannerPath = bannerPath;
    result.logoPath = logoPath;
    return (result);
}

exports.stories = functions.https.onRequest((request, response) => {
    var result = [
        storyLine("StoryMockup1", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://pbs.twimg.com/media/Dd3XwOIUwAAgIGN.jpg", "https://partnership.ovh/wp-content/uploads/2018/11/figure.png"),
        storyLine("StoryMockup2", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "http://www.easycanvasprints.com/Upload/mkt/PLA/ECP/BOTC-generic3.jpg", "https://tkruger4.files.wordpress.com/2010/11/logo-2_21.jpg"),
        storyLine("StoryMockup3 Amazing", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiIrXorfQ9MeUgZOyJhkb9UbIES3QuCWBKaw6_D9YDzTQ19iF", "https://www.brandcrowd.com/gallery/brands/pictures/picture13090346529255.jpg"),
        storyLine("StoryMockup4 indeed", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyuKjJMVoDDSPZn6yGyLVLqTby-R1rRGze6c1IYwMNPHhWfaWJ", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEnV-IDQ1_s8JfDgd7NJ9ym5o4EUKwC2dzXcAjzeeem8pQOBua"),
        storyLine("StoryMockup5", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://pbs.twimg.com/media/Dd3XwOIUwAAgIGN.jpg", "https://partnership.ovh/wp-content/uploads/2018/11/figure.png"),
        storyLine("StoryMockup6", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "http://www.easycanvasprints.com/Upload/mkt/PLA/ECP/BOTC-generic3.jpg", "https://tkruger4.files.wordpress.com/2010/11/logo-2_21.jpg"),
        storyLine("StoryMockup7 Amazing", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiIrXorfQ9MeUgZOyJhkb9UbIES3QuCWBKaw6_D9YDzTQ19iF", "https://www.brandcrowd.com/gallery/brands/pictures/picture13090346529255.jpg"),
        storyLine("StoryMockup8 indeed", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyuKjJMVoDDSPZn6yGyLVLqTby-R1rRGze6c1IYwMNPHhWfaWJ", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEnV-IDQ1_s8JfDgd7NJ9ym5o4EUKwC2dzXcAjzeeem8pQOBua"),
        storyLine("StoryMockup9", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://pbs.twimg.com/media/Dd3XwOIUwAAgIGN.jpg", "https://partnership.ovh/wp-content/uploads/2018/11/figure.png"),
        storyLine("StoryMockup10", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "http://www.easycanvasprints.com/Upload/mkt/PLA/ECP/BOTC-generic3.jpg", "https://tkruger4.files.wordpress.com/2010/11/logo-2_21.jpg"),
        storyLine("StoryMockup11 Amazing", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiIrXorfQ9MeUgZOyJhkb9UbIES3QuCWBKaw6_D9YDzTQ19iF", "https://www.brandcrowd.com/gallery/brands/pictures/picture13090346529255.jpg"),
        storyLine("StoryMockup12 indeed", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyuKjJMVoDDSPZn6yGyLVLqTby-R1rRGze6c1IYwMNPHhWfaWJ", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEnV-IDQ1_s8JfDgd7NJ9ym5o4EUKwC2dzXcAjzeeem8pQOBua"),
        storyLine("StoryMockup13", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://pbs.twimg.com/media/Dd3XwOIUwAAgIGN.jpg", "https://partnership.ovh/wp-content/uploads/2018/11/figure.png"),
        storyLine("StoryMockup14", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "http://www.easycanvasprints.com/Upload/mkt/PLA/ECP/BOTC-generic3.jpg", "https://tkruger4.files.wordpress.com/2010/11/logo-2_21.jpg"),
        storyLine("StoryMockup15 Amazing", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiIrXorfQ9MeUgZOyJhkb9UbIES3QuCWBKaw6_D9YDzTQ19iF", "https://www.brandcrowd.com/gallery/brands/pictures/picture13090346529255.jpg"),
        storyLine("StoryMockup16 indeed", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyuKjJMVoDDSPZn6yGyLVLqTby-R1rRGze6c1IYwMNPHhWfaWJ", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEnV-IDQ1_s8JfDgd7NJ9ym5o4EUKwC2dzXcAjzeeem8pQOBua"),
        storyLine("StoryMockup17", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://pbs.twimg.com/media/Dd3XwOIUwAAgIGN.jpg", "https://partnership.ovh/wp-content/uploads/2018/11/figure.png"),
        storyLine("StoryMockup18", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "http://www.easycanvasprints.com/Upload/mkt/PLA/ECP/BOTC-generic3.jpg", "https://tkruger4.files.wordpress.com/2010/11/logo-2_21.jpg"),
        storyLine("StoryMockup19 Amazing", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiIrXorfQ9MeUgZOyJhkb9UbIES3QuCWBKaw6_D9YDzTQ19iF", "https://www.brandcrowd.com/gallery/brands/pictures/picture13090346529255.jpg"),
        storyLine("StoryMockup20 indeed", "Descriptiondescriptiondescriptiondescriptiondescriptiondescription", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyuKjJMVoDDSPZn6yGyLVLqTby-R1rRGze6c1IYwMNPHhWfaWJ", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEnV-IDQ1_s8JfDgd7NJ9ym5o4EUKwC2dzXcAjzeeem8pQOBua"),
    ];
    response.send(result);
});