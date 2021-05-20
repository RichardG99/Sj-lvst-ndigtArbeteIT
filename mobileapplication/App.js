import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, Text, View, Button, Platform, ScrollView } from 'react-native';
import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import { Audio } from 'expo-av';
import { render } from 'react-dom';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import Login from "./src/shared/components/Login.js";
import AddUser from "./src/shared/components/AddUser.js";
import Game from "./src/shared/components/Game.js";
import Home from "./src/shared/components/Home.js";
import Stories from "./src/shared/components/Stories.js";
import MyLibrary from "./src/shared/components/MyLibrary.js";
import EditProfile from "./src/shared/components/EditProfile.js";



// TODO :
/*
// TODO make sure you dont permanently store the audio
// TODO set code safety, handle bad requests, handle tries
  2. Get Story list
  3. Get Story audio files
  4. LogOut?
*/
/* IGNORE
async function nativeConsoleLog (text){
  fetch('http://192.168.1.40:1337/consolelogfornative', {
        method: 'POST',
        body: text,
        headers:{
          Accept: 'text/html',
          'Content-Type': 'text/html',
        }
      })
}
async function test() {
  try {
    var tmpTest;
    await fetch('http://192.168.1.40:1337/native').then((response) => 
      tmpTest = response.json()
    )
    console.log("testinging")
    console.log(tmpTest._55.color);
    // Strange ass way to handle responses.... but ok
    await fetch('http://192.168.1.40:1337/consolelogfornative', {
      method: 'POST',
      body: tmpTest,
      headers: {
        'content-Type': "text/html"
      }
    })
  } catch (error) {
    console.error(error);
  }
}
*/
/*
function login(){
  console.log("ASDASDASd")
  Parse.User.logIn("q", "q")
}
function logOut(){

  Parse.User.logOut()
  console.log("Parse log Out temporaraly broken (user cached, session token is null :)");
}
function Auth(){
  console.log(Parse.User.currentAsync())
}

/// PLATFORM CHECK
const IOS = Platform.OS === 'ios' ? true : false;
const ANDROID = Platform.OS === 'android' ? true : false;

  // Cloud testing function

  cloud = async () => {
    const params = {movie: "The Matrix"}
    const ratings = await Parse.Cloud.run("averageStars", params);
    console.log(ratings); 
  }
*/
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.debugging = false;
  }
  
  // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
  LogItAll = async () => {
    /*console.log("error under here lol")
    record();
    setTimeout(async () => {
      await stopRecording();
      const audio = getRecording(); // The recording is the audio we want to send. (has more functionality such as getURI)
      console.log(audio.getURI());
      //return await this.speechToTextAPI(audio);
    }, 3000);
    */
    //console.log("Hello");
    //console.log(this.allStories);
    //this.getAndLoadBoxAudioFile("ynxWrkNZuG")
    //console.log(await this.pathPicking(null, "ynxWrkNZuG"));
    /*
    console.log("doc")
    console.log(FileSystem.getContentUriAsync(FileSystem.documentDirectory));
    console.log("cache");
    console.log(FileSystem.getContentUriAsync(FileSystem.cacheDirectory));
    */
  }
/* --------------------------------------Audio / voice functionality------------------------------ */

  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="AddUser" component={AddUser} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Stories" component={Stories} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="My Library" component={MyLibrary} />
            <Stack.Screen name="Edit Profile" component={EditProfile} />
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

/* OLD CODE FOR TOGGLE BETWEEN DEBUGGING OR HOME PAGE
          <View style={styles.container}>
            {
              this.debugging ? 
              <Button 
                title = 'debug log from App.js'
                onPress = {this.logItAll}
              />
              :
              <Home />
            }
          </View> 

*/

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/*

  █▀▀▄░░░░░░░░░░░▄▀▀█
░█░░░▀▄░▄▄▄▄▄░▄▀░░░█
░░▀▄░░░▀░░░░░▀░░░▄▀
░░░░▌░▄▄░░░▄▄░▐▀▀
░░░▐░░█▄░░░▄█░░▌▄▄▀▀▀▀█
░░░▌▄▄▀▀░▄░▀▀▄▄▐░░░░░░█
▄▀▀▐▀▀░▄▄▄▄▄░▀▀▌▄▄▄░░░█
█░░░▀▄░█░░░█░▄▀░░░░█▀▀▀
░▀▄░░▀░░▀▀▀░░▀░░░▄█▀
░░░█░░░░░░░░░░░▄▀▄░▀▄
░░░█░░░░░░░░░▄▀█░░█░░█
░░░█░░░░░░░░░░░█▄█░░▄▀
░░░█░░░░░░░░░░░████▀
░░░▀▄▄▀▀▄▄▀▀▄▄▄█

*/