const javascript_utils = require("./javascript_utils");

exports.getUtils = function () {
    return (javascript_utils);
};

exports.getCollections = function () {
    const collectionsUtils = require('./collections');
    return (collectionsUtils.build());
}