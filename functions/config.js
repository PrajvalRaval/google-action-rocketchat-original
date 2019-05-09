// Environment Variables
const functions = require('firebase-functions');

module.exports = {
    serverurl : functions.config().envariables.serverurl,
	username : functions.config().envariables.username,
    password : functions.config().envariables.password,
    authtoken : functions.config().envariables.authtoken,
    userid : functions.config().envariables.userid
};
