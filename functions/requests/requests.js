const test_requests = {
    helloWorld:require("./helloWorld").helloWorld
};

const get_requests = {
    getStories:require("./get/getStories").getStories,
    getProjectQueryResult:require("./get/getProjectQueryResult").getProjectQueryResult,
    getProfile:require("./get/getProfile").getProfile,
    getProject:require("./get/getProject").getProject,
    getNotif:require("./get/getNotif").getNotif,
    getProjectMembers:require("./get/getProjectMembers").getProjectMembers,
    getCandidates:require("./get/getCandidates").getCandidates,
};

const post_requests = {
    postAnswerCandidature:require("./post/postAnswerCandidature").postAnswerCandidature,
    postProject:require("./post/postProject").postProject,
    postMembershipSlot:require("./post/postMembershipSlot").postMembershipSlot,
    postMembershipCandidature:require("./post/postMembershipCandidature").postMembershipCandidature,
};

const del_requests = {};

const put_requests = {
    putRedNotification:require("./put/putRedNotification").putRedNotification,
};

[test_requests, get_requests, post_requests, del_requests, put_requests].forEach( // for each request type
    element => {
        for (x in element) { // for each request
            exports[x] = element[x]; // add to export the told request
        }
    }
);