// -- A settings file for tweaking destination URL and port, as well as any other settings which should not change at runtime but rather only between builds
var settings = {};

//Whether the mobile application should attempt to connect to the developer server (devmode) or the stable, live server
settings.devmode = true;

//The server URL and port that our live server is deployed on.
var liveServerURL = "augmentedaud.io"; // Note that this should not contain the HTTP field or closing "/"
var liveServerPort = 1337;
var liveAppID = "AugAud";
var liveServerSSL = true; // Determines whether the live server should be accessed via SSL. Only enable if you know the live server has a correctly configured SSL

//The server URL and port that our development server is deployed on.
var devServerURL = "51.13.79.85"; // Note that this should not contain the HTTP field or closing "/"
var devServerPort = 1337;
var devAppID = "myAppId";
var devServerSSL = false; // Determines whether the development server should be accessed via SSL. Only enable if you know the development server has a correctly configured SSL

//"Cheating" macros to only expose our currently valid settings: these should NOT be changed manually
settings.serverURL = settings.devmode ? devServerURL : liveServerURL;
settings.serverPort = settings.devmode ? devServerPort : liveServerPort;
settings.appId = settings.devmode ? devAppID : liveAppID;
settings.serverSSL = settings.devmode ? devServerSSL : liveServerSSL;

module.exports = settings;
