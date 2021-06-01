import * as Permissions from 'expo-permissions';
import "../local_modules/AugmentedAudio.js";
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Platform, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import {Button} from 'react-native-elements'
import Parse, { User } from 'parse/react-native';
import ParseReact from 'parse-react/react-native'
import "../common.js"
import * as FileSystem from 'expo-file-system';
import * as Brightness from 'expo-brightness';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import VarState from './VarState.js';
import { Audio } from 'expo-av';
// TODO : change this.currentBoxID -> currentBoxId
// TODO : change activeStoryID -> activeStoryId
// TODO : change timeStamp -> currentTime
// FIXME : Audio files with same names when uploading
// FIXME : Android laggar?



export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.activeStoryID = this.props.route.params.activeStoryId;
    this.currentBoxID = this.props.route.params.currentBoxId;
    this.currentTime = this.props.route.params.currentTime;
    this.iDidNotHearYouMp3 = "";
    this.potentialPaths = []; 
    this.potentialStoriesURI = []; // {status: 1done/-1notdone, address: URI/URL}
    this.pickedPathIndex = -1; 
    this.trackEnded = false;
    this.attempts = 0;
    this.maxAttempts = 5;
    this.savedBrightness = 1;
    this.state = {
      recordingPermissions: false,
      brightnessPermission: false,
      playing: false,

      currentBoxTitle: "Loading...",
      currentBoxTime: "0",
      storyTitle: this.props.route.params.storyTitle,
    }
    this.debugging = false;
    this.variableState = new VarState();
    this.backHandler = null;
  }
  componentDidMount(){
    this.getPermissions();
    this.getChapterInfo().then(() => {
      Parse.User.currentAsync().then((user) => {
        this.variableState.loadData(user.getUsername(), this.activeStoryID);
      });
    });
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount() {
    if(this.backHandler != null)
      this.backHandler.remove();
  }

  getChapterInfo = async (BoxID) => {
    const Box = Parse.Object.extend("Box");
    const query = new Parse.Query(Box);
    query.get(this.props.route.params.currentBoxId).then((box) => {
      this.setState({currentBoxTitle: box.get("title"), currentBoxTime: this.props.route.params.currentTime});
    });
  }
  getPermissions = async () => {
    console.log("getting perms");
    const respAudio = await Permissions.askAsync(Permissions.AUDIO_RECORDING); // Get recording permission
    this.setState({
      recordingPermissions: respAudio.status === 'granted'  // Evaluates true given that permissions are granted.
    });
    console.log(respAudio.status);
    const respBrightness = await Permissions.askAsync(Permissions.SYSTEM_BRIGHTNESS);
    this.setState({
      brightnessPermission: respBrightness.status === 'granted'
    });
    console.log(respBrightness.status);
  }
  speechToTextAPI = async (audio) => {
    const recordingURI = audio.getURI();
    file_to_send = await FileSystem.readAsStringAsync(recordingURI, {encoding: FileSystem.EncodingType.Base64});
    const possiblePaths = await this.getBoxPaths(this.currentBoxID);
    let keywords = [];
    for (let i = 0; i < possiblePaths.length; i++){
      keywords = [...keywords, possiblePaths[i].get("keyword")];
    }
    //const params = {audio_base64: file_to_send, OS: Platform.OS}; // Send audio + platform info
    const params = {
      audio: file_to_send,
      keywords: keywords,
    };
    const converted_text = await Parse.Cloud.run("speechToTextCall", params);
    // delete recording to free space. don't wait for delete to complete
    // don't care if file is already deleted
    FileSystem.deleteAsync(recordingURI, {idempotent: true});
    console.log(converted_text);
    return converted_text;
  }
  recordAndTranscribe = async (messageLength) => {
    stopAudio();
    record();
    await this.sleep(messageLength);
    await stopRecording();
    const audio = getRecording();
    const pelle = await this.speechToTextAPI(audio)
    return pelle;
  }
  // TODO later on we'll add in more audio files to play this is where they're to be loaded.
  // also this function might need to be split up into two pieces when this happens.
  getAndLoadBoxAudioFile = async (boxID) => {
    var audioURL;
    const Box = Parse.Object.extend("Box");
    const query = new Parse.Query(Box);
    await query.get(boxID).then(async (box) => {
        audioURL = box.get("audio_url");
        await setAudioModePlayback();
        await setAudioWithUrl(audioURL);
    })
  }
  downloadAudio = async (audioURL, fileName) => {
    const dl = FileSystem.createDownloadResumable(
      audioURL,
      FileSystem.documentDirectory + fileName
    );
    try {
      const fileUri = await dl.downloadAsync();
      return { uri: fileUri.uri, status: 1, fileObjectMeta: fileUri }
    } catch (e) {
      console.error(e);
      console.log("something went wrong...");
      return { uri: "", status: -1}
    }
  }
  // boxID is fromboxID
  mongoloidcounter = async (string) => {
    let x = 0;
    while(x < 100){
      console.log(string + x)
      await this.sleep(100);
      x++;
    }
  }
  downloadAllAudio = async (listOfURLs) => { // DANGER DANGER MIGHT CONTINUE DOWNLOADING
    for (var i = 0; i < listOfURLs.length; i++){
      var audioURL;
      const Box = Parse.Object.extend("Box");
      const query = new Parse.Query(Box);
      await query.get(listOfURLs[i]).then(async (box) => {
        audioURL = box.get("audio_url");
        console.log("debug: audioURL:"+audioURL + " ,index:" + i);
        const downloadedAudio = await this.downloadAudio(audioURL, "audio" + i);
        this.potentialStoriesURI[i] = {status: 1, address: downloadedAudio.fileObjectMeta}
      })
    }
    console.log("all audio downloaded...")
  }

  /**
   * Picks a path to progress down in the story depending on our current state and our recieved keyword
   * @param string If non-null, the string that was transcribed using speech-to-text. 
   *               If null, tells the path picker to ignore keywords entirely and continually wait until one of the paths become valid
   * @param paths All potential paths to pick from
   * @returns the object {chosenPath: [the path chosen], status: [1 if succesful, -1 if not]}
   */
  pathPicking = async (string, paths) => {
    let stringList = null;
    if (string !== null) {
      stringList = this.stringToStringList(string.toLowerCase());
      this.stringToStringList(string);
      //console.log("Keywords: ",stringList);
    }
    do  {
      console.log("pathPick loop");
      for (var y = 0; y < paths.length; y++){
        //Verify that this path is pickable: if not, we don't pick the path
        let evalResult = 1;
        try {
          const condition = paths[y].get("condition");
          if (condition !== null && condition !== "" && condition !== undefined) {
            evalResult = this.variableState.eval(condition);
            console.log(condition, ":", evalResult);
          }
        } catch {
          console.log("Error when evaluating path with data: ");
          console.log(paths[y]);
          evalResult = 1; // Error when evaluating or getting condition We allow the path in this case, but log the event
        }
        if (evalResult === 1) {
          if(paths[y].get("keyword") === "") {
            this.pickedPathIndex = y; // 2020 HERE
            return {chosenPath: paths[y], status: 1}
          }

          for (var x = 0; x < stringList.length; x++){
            if (stringList[x] === paths[y].get("keyword") ){
              this.pickedPathIndex = y; // 2020 HERE
              return {chosenPath: paths[y], status: 1}
            }
          }
        }
      } 

      //When not working with keywords, we continually check every second
      if (string === null) {
        console.log("Waiting for sensor ...");
        this.sleep(1000);
      }
    } while (string === null);
    return {chosenPath: null, status: -1};
  }
  
  getBoxPaths = async (boxID) => {
    const Path = Parse.Object.extend("Path");
    const query = new Parse.Query(Path);
    query.equalTo("fromId", boxID);
    return await query.find();   
  }
  // TODO: needs improvement... but works for what we intend to use it for.
  // not safe for strange sentences ex : "  Hello     my name is   !!  "
  stringToStringList = (string) => {
    var stringList = [];
    var nextString = "";
    for (var i = 0; i < string.length; i++){
      if (string[i] === " "){
        stringList = [...stringList, nextString];
        nextString = "";
      } else {
        nextString = nextString + string[i];
      }
    }
    if (string[string.length - 1] !== " "){
      stringList = [...stringList, nextString];
    }
    return stringList;
  }

  /**
   * Updates the user's current progress in a story, and stores the custom variable state linked to it
   */
  updateMyStory = () => {
    Parse.User.currentAsync().then((user) => {
      let myLibrary = user.get("myLibrary");
      for (var i = 0; i < myLibrary.length; i++){  
        let storyID = myLibrary[i].story.id; 
        if (this.activeStoryID === storyID){
          myLibrary[i].currentBoxId = this.currentBoxID;
          myLibrary[i].timeStamp = this.currentTime;
          user.set("myLibrary", myLibrary);
          this.variableState.saveData(user.getUsername(), storyID);
        }
      }

      user.save();      
    })
  }

  /**
   * Resets a story's prograess and custom variables back to their starting state
   */
  resetStory = () => {
    Parse.User.currentAsync().then((user) => {
      let myLibrary = user.get("myLibrary");
      for (var i = 0; i < myLibrary.length; i++){
        let storyID = myLibrary[i].story.id 
        if (this.activeStoryID === storyID) {
          this.variableState = new VarState();
          this.variableState.saveData(user.getUsername(), storyID);
          myLibrary[i].currentBoxId = myLibrary[i].story.get("startingBoxId");
          myLibrary[i].timeStamp = 0;
          this.currentTime = 0;
          this.currentBoxID = myLibrary[i].story.get("startingBoxId");
          user.set("myLibrary", myLibrary);
        }
      }
      user.save();      
    })

  }

  iDidNotHearYou = async () => {
    console.log('Loading Sound');
    const {sound}  = await Audio.Sound.createAsync(require('../media/audio/iDidNotHearYou.mp3'));
    console.log('Playing Sound');
    await sound.playAsync();
  }
  
  // TODO fix a _onTrackEnd function.. ...
  // TODO remake this part... honestly  its bingo bango...
  playAugmentedAudio = async () => {
    await this.setState({playing: true}) // Currently playing 
    this.savedBrightness = await Brightness.getBrightnessAsync();
    Brightness.setSystemBrightnessAsync(0); // Lower Screen Brightness 
    this.trackEnded = false;
    let newBoxReady = true;
    let cheapCounterFix = 0;

    // Temporary fix for feedback between choices
    // TODO : this file does not exist anymore, replace with another audio file to prompt the user to reiterate what they previously said.
    //const resp = await this.downloadAudio("https://cellis.studio/Vo3o9H6z.mp3", "iDidNotHearYou.mp3")
    /*const resp = await Audio.Sound.createAsync(require("../media/audio/iDidNotHearYou.mp3"));
    if (resp.status === 1){
      this.iDidNotHearYouMp3 = resp.fileObjectMeta;
      console.log("XXXX", this.iDidNotHearYouMp3);
    } else {
      console.log("Erroooorrrr could not load iDidNotHearYouMp3, turning off game..");
      return; // Exits game
    }*/
    
    // End of temporary fix
    console.log(this.currentBoxID, this.currentTime, this.state.currentBoxTitle);
    while(this.state.playing){
      // Check if this.state.playing on each thing you do in case the game has been paused.
      // Load and play audio
      
      if (newBoxReady){ // check if currently playing audio
        // currentBox and currentTime have to be correct here
        try {
        if (this.potentialStoriesURI.length !== 0 && this.pickedPathIndex !== -1){
          if (this.potentialStoriesURI[this.pickedPathIndex].status === 1){
            await setAudioWithUri(this.potentialStoriesURI[this.pickedPathIndex].address); //Load
            this.pickedPathIndex = -1;
          } else {
            await this.getAndLoadBoxAudioFile(this.currentBoxID); // downLoad 
            this.pickedPathIndex = -1;
          }
        } else {
          await this.getAndLoadBoxAudioFile(this.currentBoxID); // downLoad 
        }
        this.trackEnded = false;
        newBoxReady = false;
        
        setAudioPlaybackStatusFunction((PlaybackStatus) => { // set function
          // here we can set update as well, but might need some adjusting on how often it checks.
          // this.currentTime = PlaybackStatus.positionMillis
          try {
            this.updateMyStory()
            if (PlaybackStatus.didJustFinish === true){
              this.trackEnded = true;
            }
          } catch (e) {
            console.log("Error in status function...")
          }
        })
        console.log("playing...")
        startPlayingAtTime(this.currentTime); // then play
        
        // PREPARE FOR NEXT AUDIO FILE : 
        this.potentialPaths = await this.getBoxPaths(this.currentBoxID);
        let listOfURLs = [];
        this.potentialStoriesURI = [];
        for(var i = 0; i < this.potentialPaths.length; i++){
          let URL = await this.potentialPaths[i].get("toId");
          listOfURLs = [...listOfURLs, URL];
          this.potentialStoriesURI = [...this.potentialStoriesURI, {status: -1, address: URL}]; // FIlls list with empty entries
        }
        this.downloadAllAudio(listOfURLs);
      } catch (e) {
        console.log("newBoxReady error...")
      }
      }
      if(cheapCounterFix >= 5){
        console.log("playing audio (outerloop)...")
      }
      if (this.trackEnded){
        console.log("track ended");
        // Update box set time to maxTime in case something breaks along the way of making the choice
        let newTime = await getAudioTime();
        if (newTime !== -1){
          this.currentTime = newTime; // TODO : newTime - 5? (make sure not (newTime - 5) > 0) 
        } else {
          this.currentTime = this.currentTime; // TODO : currentTime - 5?
        }      
        console.log("audio time returns");
        this.updateMyStory();
        let speechString = "asd";
        let path = null;
        let picking = true;
        let failedToPick = false;
        this.attempts = 0;
        let iDidNotHearYouMp3Finished = false;
        while (picking) {
          if (this.potentialPaths.length === 0){
            console.log("story over, no more paths to take...")
            Brightness.setSystemBrightnessAsync(this.savedBrightness);
            return;
          }
          //If we have paths with keywords, we wait for a keyword
          if (this.pathsHasKewords(this.potentialPaths)) {
            console.log("start speaking...");
            speechString = await this.recordAndTranscribe(6000);
            if (!this.state.playing){
              return; // game has been ended during recording phase.
            }
            path = await this.pathPicking(speechString, this.potentialPaths);
          } else {
            console.log("no recording will be done");
            path = await this.pathPicking(null, this.potentialPaths);
          }

          if (path.status === 1){
            let newBoxID = await path.chosenPath.get("toId");
            this.currentBoxID = newBoxID; 
            this.currentTime = 0; 
            picking = false;
            newBoxReady = true;
            this.trackEnded = false;
            this.updateMyStory(); 
          } else if (path.status === -1) {
            if (this.attempts >= this.maxAttempts){
              failedToPick = true;
              picking = false;
              this.trackEnded = false; // force player to restart
              newBoxReady = false; // force player to restart
              this.setState({playing: false})
            } else {
              await this.iDidNotHearYou();
              this.attempts++;
            }
          }
          console.log("Picking Inner Loop...")
        }
      }
      if (!newBoxReady){
        await this.sleep(200); // lets not overload the thread
        // Updating here as a quick fix
        if (cheapCounterFix >= 5){
          let newTime = await getAudioTime();
          if (newTime !== -1){
            this.currentTime = newTime;
          } else {
            this.currentTime = this.currentTime;
          }
          cheapCounterFix = 0;
        } else {
          cheapCounterFix++;
        }
        this.updateMyStory();
      }
    }
    if (!this.state.playing){
      await forcePauseAudio(); // force pausing...
      return; // game ended during load phase / starting phase
    }
  }
  pauseAugmentedAudio = async () => {
    this.setState({playing: false}) // No Longer Playing
    await forcePauseAudio();
    Brightness.setSystemBrightnessAsync(this.savedBrightness); // Raise Screen Brightness
    if (!this.trackEnded){
      let newTime = await getAudioTime();
      if (newTime !== -1){
        this.currentTime = newTime;
      } else {
        this.currentTime = this.currentTime;
      }
      this.updateMyStory();
    }
    this.attempts = this.maxAttempts;
    console.log("pausing at time : " +this.currentTime);
  }

  /**
   * Checks if any of the inputted paths has a keyword attached to it
   * @returns true if one or more of the paths has a keword, false otherwise
   */
  pathsHasKewords = (paths) => {
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      if (path.get("keyword") !== null && 
          path.get("keyword") !== undefined && 
          path.get("keyword") !== "") {
        return true;
      }
    }

    return false;    
  }

  stopAugmentedAudio = async () => {

  }

  /**
   * Utility function for delaying program execution by a certain number of milliseconds. Delays only the current thread
   * @param ms Sleep time, in milliseconds
   */
  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // Debugging function -- Helps a lot ฅ^•ﻌ•^ฅ
  logIt = async () => {
    console.log("STT starts");
    console.log(await this.recordAndTranscribe(3000));
    console.log("STT ended");
  }

  backAction = () => {
    if (this.state.playing) {
      this.pauseAugmentedAudio()
      console.log("was playing now pausing")
    } else {
        this.props.navigation.goBack(null);
      }
    console.log("back");
    return true;
  }

  enterMainLoop = async () => {
    await this.playAugmentedAudio();
    Brightness.setSystemBrightnessAsync(this.savedBrightness);
    this.props.navigation.navigate('My Library');
  }

  render() {
    return (
    <View style={styles.container}>
      {
        this.state.playing ? 
        <View>
          <TouchableOpacity style={{
            height: 9999, // TODO make this fullscreen not fixed value
            width: 9999, // TODO make this fullscreen not fixed value    
            backgroundColor: 'black'
          }}
            onPress={this.pauseAugmentedAudio}
          >
            <View>
              
            </View>
          </TouchableOpacity>
              
        </View>
      :       
        <View>
          {
          this.debugging ? 
          <Button 
            title='Log from Game.js'
            onPress={this.logIt}
          />
          :
          <View />
          }
          <Text style={styles.headerLarge}> 
            <Text style={styles.titleLarge}>
              {this.state.storyTitle}
            </Text>
          </Text>
          <Text style={styles.headerSmall}>
            Chapter : 
          </Text>
          <Text style={styles.titleSmall}>
            {this.state.currentBoxTitle}
          </Text>
          <Button 
            style={styles.button}
            icon={{name: 'play-circle', type: 'font-awesome'}}
            title='Play Story'
            onPress={this.enterMainLoop}
            //onPress={this.playAugmentedAudio}
          />
          <Button 
            
            style={styles.button}
            icon={{name: 'cached'}}
            title='Reset Story'
            onPress={this.resetStory}
            
          />
          <Button
            style={styles.button}
            title='Stop audio'
            onPress={stopAudio}
          />
        </View>
      }
    </View> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    
  },
  titleSmall: {
    fontSize: 18,
    color: 'white'
  },
  headerSmall: {
    fontSize: 18,
    color: 'grey',
  },
  titleLarge: {
    fontSize: 32,
    color: 'white'
  },
  headerLarge: {
    fontSize: 32,
    color: 'grey',
  },
  author: {
    fontSize: 32,
    color: 'grey',
  }
});