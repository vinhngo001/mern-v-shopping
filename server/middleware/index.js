const auth = require("./auth.middleware");
const admin = require("./admin.middleware");

module.exports = {
    auth, 
    admin
}