// -- A settings file for tweaking destination URL and port, as well as any other settings which should not change at runtime but rather only between builds
var settings = {};

//Whether our server is currently designated as a developer build: this should only be "false" on a live server
settings.devmode = true;

//The server URL, port, appID and database URI that our live server is deployed on
var liveServerURL = "http://dev.cellis.studio";
var liveServerPort = 1991;
var liveAppID = "augmented_audio";
var liveDatabaseURI = ""; //TODO: add a live database URI

//The server URL, port, appID and database URI that our development server is deployed on
var devServerURL = "http://51.13.79.85";
var devServerPort = 1337;
var devAppID = "myAppId";
var devDatabaseURI = "mongodb://localhost";

//"Cheating" macros to only expose our currently valid settings: these should NOT be changed manually
settings.serverURL = settings.devmode ? devServerURL : liveServerURL;
settings.serverPort = settings.devmode ? devServerPort : liveServerPort;
settings.appID = settings.devmode ? devAppID : liveAppID;
settings.databaseURI = settings.devmode ? devDatabaseURI : liveDatabaseURI;


module.exports = settings;
