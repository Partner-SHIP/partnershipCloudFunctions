const test_requests = {
    helloWorld:require("./helloWorld").helloWorld
};

const get_requests = {
    getStories:require("./get/getStories").getStories,
    getProjectQueryResult:require("./get/getProjectQueryResult").getProjectQueryResult
};

const post_requests = {};

const del_requests = {};

const put_requests = {};

[test_requests, get_requests, post_requests, del_requests, put_requests].forEach( // for each request type
    element => {
        for (x in element) { // for each request
            exports[x] = element[x]; // add to export the told request
        }
    }
);