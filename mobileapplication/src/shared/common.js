import { AsyncStorage } from 'react-native';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import serverIP from './serverIP';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('myAppId', 'DreamScape');
Parse.CoreManager.set('SERVER_URL', `http://${serverIP}:1337/parse`);
/*
// add file containing this @ ./serverIP
const serverIP = "192.168.1.40"
export default serverIP;
*/
