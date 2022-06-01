// -- A settings file for tweaking destination URL and port, as well as any other settings which should not change at runtime but rather only between builds
var settings = {};

//Whether our server is currently designated as a developer build: this should only be "false" on a live server
settings.devmode = true;

//The server URL, port, appID and database URI that our live server is deployed on
var liveServerURL = "https://augmentedaud.io";
var liveServerPort = 1337;
var liveAppID = "AugAud";
var liveDatabaseURI = "mongodb://localhost"; //TODO: add a live database URI

//The server URL, port, appID and database URI that our development server is deployed on
var devServerURL = "http://172.20.10.2:1337"; // http://localhost:1337 http://172.20.10.2:1337
var devServerPort = 1337;
var devAppID = "myAppId";
var devDatabaseURI = "mongodb://172.20.10.2"; // mongodb://localhost mongodb://172.20.10.2


// Isaks
// var STRIPE_PUBLISHABLE_KEY = "pk_test_51KrJ5HAqt7xgnAosh9b6e6BWi6LjPOqIuR0srraW0NhEQic3BRypd1Yy5QVSAfJFDko3JEhnyp3mCx0eLYihezZu00wpue7tpi"
// Viktors
var STRIPE_PUBLISHABLE_KEY = "pk_test_51KoR1DH4rsPpfikp8tbu2XmCtyVGfchiKq0nT41La9cDa6dteU00TwX1l3QUSFJcFhIB7Eqr1yYfWsWI0WX1mvas006L4QZD6Z"
// Isaks
// var STRIPE_SECRET_KEY = "sk_test_51KrJ5HAqt7xgnAosEShNJIlil09QWgMETFN3g8oHlqOHo29XM5QJHOSVGderXS3UWmCJ6v1XLzDQx1aYw8SdOUI000qBIWFneJ"
// Viktor 
var STRIPE_SECRET_KEY = "sk_test_51KoR1DH4rsPpfikp2hmuBqDxfIp877y64ixqo3HgeUOr2sLzqagw6qsnOv4FSnhXNVbjgsjurxAhKVTOn6dVWUeH00DnKyemlv"
var STRIPE_WEBHOOK_SECRET = "whsec_119acad24ac7290b7be65eae3c1044d085da0683d51c8492899ceed972f68183"

//"Cheating" macros to only expose our currently valid settings: these should NOT be changed manually
settings.serverURL = settings.devmode ? devServerURL : liveServerURL;
settings.serverPort = settings.devmode ? devServerPort : liveServerPort;
settings.appID = settings.devmode ? devAppID : liveAppID;
settings.databaseURI = settings.devmode ? devDatabaseURI : liveDatabaseURI;
settings.STRIPE_PUBLISHABLE_KEY = STRIPE_PUBLISHABLE_KEY;
settings.STRIPE_SECRET_KEY = STRIPE_SECRET_KEY;
settings.STRIPE_WEBHOOK_SECRET = STRIPE_WEBHOOK_SECRET;

module.exports = settings;
