const alias = {
    membership: "membership",
    profiles: "profiles",
    users: "/users/",
    projects: "projects"
}

exports.build = function () {
    return (
        {
            alias: alias
        }
    );
};