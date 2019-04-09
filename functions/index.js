const firebase = require("./firebase.js");
const requests = require("./requests/requests");

firebase.admin.initializeApp();

for (x in requests) {
    exports[x] = requests[x];
}
