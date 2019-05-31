const triggers = {
    membershipOnCreate:require("./membership/membershipOnCreate").membershipOnCreate,
};

for (x in triggers) {
    exports[x] = triggers[x];
}