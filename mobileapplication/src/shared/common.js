import { AsyncStorage } from 'react-native';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import settings from './settings';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('myAppId', 'AugmentedAudio');

//Ensure that we're using the server URL and port from our settings file, and that we are using SSL if enabled. Note that SSL does not utilize port numbers
let serverURL = `http://${settings.serverURL}:${settings.serverPort}/parse`;
if (settings.serverSSL) {
  serverURL = `https://${settings.serverURL}/parse`;
}
Parse.CoreManager.set('SERVER_URL', serverURL);
