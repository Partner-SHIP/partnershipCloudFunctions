const alias = {
    membership: "membership",
    pendingCandidature: "pendingCandidature",
    membershipSlot: "membershipSlot",
    profiles: "profiles",
    notifications:"notifications",
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