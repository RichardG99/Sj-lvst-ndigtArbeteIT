const Parse = require('parse');

Parse.initialize('myAppId', 'DreamScape');
Parse.CoreManager.set('SERVER_URL', 'http://dream.cellis.studio:1337/parse');

export default Parse;
