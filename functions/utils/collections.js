const alias = {
    membership: "membership",
    profiles: "profiles",
    users: "/users/",
    projects: "projects",
    stories: "stories",
}

exports.build = function () {
    return (
        {
            alias: alias
        }
    );
};