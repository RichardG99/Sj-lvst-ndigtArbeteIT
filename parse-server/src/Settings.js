// -- A settings file for tweaking destination URL and port, as well as any other settings which should not change at runtime but rather only between builds
var settings = {};

//Whether our server is currently designated as a developer build: this should only be "false" on a live server
settings.devmode = true;

//The server URL and port that our live server is deployed on
var liveServerURL = "http://dream.cellis.studio";
var liveServerPort = 1991;

//The server URL and port that our development server is deployed on
var devServerURL = "http://dream.cellis.studio";
var devServerPort = 1337;

//"Cheating" macro to only expose our currently valid port and server: these should NOT be changed manually
settings.serverURL = settings.devmode ? devServerURL : liveServerURL;
settings.serverPort = settings.devmode ? devServerPort : liveServerPort;

module.exports = settings;