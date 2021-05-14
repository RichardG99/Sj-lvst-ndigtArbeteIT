import settings from '../Settings'

const Parse = require('parse');

// Initializes the parse app and sets its ID and javascript key
Parse.initialize(settings.appID, 'AugmentedAudio');

// Sets which destination address our Parse server is expected to be located at
//    Note that this is an absolute address, and not relative to the server's URL!
Parse.CoreManager.set('SERVER_URL', settings.serverURL+':'+settings.serverPort+'/parse'); 

export default Parse;
