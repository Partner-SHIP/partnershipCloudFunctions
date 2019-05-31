const javascript_utils = require("./javascript_utils");

exports.getUtils = function () {
    return (javascript_utils);
};

exports.getCollections = function () {
    const collectionsUtils = require('./collections');
    return (collectionsUtils.build());
}

exports.isUndefined = function () {
    return function (value) {
        if (value === null)
            return (true);
        if (typeof value === "undefined")
            return (true);
        return (false);
    }
}