const Parse = require('parse');

Parse.initialize('myAppId', 'DreamScape');
Parse.CoreManager.set('SERVER_URL', 'http://localhost:1337/parse');

export default Parse;
