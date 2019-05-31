const firebase = require("./firebase.js");
const requests = require("./requests/requests");
const triggers = require("./triggers/triggers");

firebase.admin.initializeApp();

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
