const Parse = require('parse');

// Sets the ID of our Parse app
Parse.initialize('myAppId', 'DreamScape');

// Sets which destination address our Parse server is expected to be located at
//    Note that this is an absolute address, and not relative to the server's URL!
Parse.CoreManager.set('SERVER_URL', 'http://dream.cellis.studio:1337/parse'); 

export default Parse;
