import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

/* ----------------------------------------- AUDIO SETTINGS -----------------------------------------*/
const RECORDING_OPTIONS_PRESET_IBM_WATSON = {
  android: {
    extension: '.webm',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_WEBM, // Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4
    audioEncoder: 7, //Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_OPUS, // Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC
    sampleRate: 48000, // 44100
    numberOfChannels: 1, // 2
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
    sampleRate: 44100, // 16000
    numberOfChannels: 1, // 2
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};
  /* ----------------------------------------- AUDIO SETTINGS -----------------------------------------*/

// Audio settings
let paused = false;
let playing = false;
let recording = null;
let audio = null;
let audiostatus = null;


setAudioModeRecording = async () => {
  const promise = await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
    staysActiveInBackground: false,
  });
};

setAudioModePlayback = async () => {
  const promise = await Audio.setAudioModeAsync({
    allowsRecordingIOS: false, // SHouldn't this be true?`sInce we are getting permissions first...
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX, // To not mix audio with other applications. Important
    playsInSilentModeIOS: true, // Audio should be able to be played even though phone is in silent mode (Doesn't exist for Android?)
    // playsInSilentLockedModeIOS: true, // Doesn't seem to exist anymore within IOS?
    shouldDuckAndroid: true, // allows other apps (phone calls etc) to mute your application given that their audio is playing.
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, // To not mix audio with other applications. Important
    playThroughEarpieceAndroid: false, // Routes audio to earpiece given that it exists, should perhaps be true?
    staysActiveInBackground: false, // playback in background, false means we cant play audio whilst application is in background
  });
};

record = async () => {
  if (audio !== null) {
    await audio.unloadAsync(); // stops playing Audio
    audio = null; // Removes previous recording... since java it should just be completely removed but idk...
  }
  /*
  console.log("PERMISSIONS IN RECORD")
  await Audio.requestPermissionsAsync().then((result) => {
    console.log(result)
    }); 
    */
  await setAudioModeRecording();
  const newRecording = new Audio.Recording();

  await newRecording.prepareToRecordAsync(RECORDING_OPTIONS_PRESET_IBM_WATSON);
  // recording.setOnRecordingStatusUpdate(add some callback function so we can do something with audio??)
  recording = newRecording;

  await recording.startAsync(); // start the recording.
  // /console.log(recording);
  console.log('recording ...');
};

stopRecording = async () => {
  await recording.stopAndUnloadAsync(); // Ends recording
  // console.log(recording.getURI()); // checks destination
  const info = await FileSystem.getInfoAsync(recording.getURI());
  console.log(`Info   ${JSON.stringify(info)}`);
  await setAudioModePlayback();
  const { sound, status } = await recording.createNewLoadedSoundAsync(
    {
      isLooping: true,
      isMuted: false,
      valume: 1.0,
      rate: 1.0,
      shouldCorrectPitch: true,
    },
  );
  audiostatus = status;
  audio = sound;

  console.log('recorded');
};
// FIXME what do we think about returning the entire status? maybe slim it down to just ms and playing?
getAudioIsPlaying = async () => {
  if (audio !== null) {
    const status = await audio.getStatusAsync();
    return status.isPlaying;
  }
  return false;
};
getAudioTime = async () => {
  try {
    if (audio !== null) {
      const status = await audio.getStatusAsync();
      //console.log("audio exists : " + status.positionMillis);
      return await status.positionMillis;
    }
    console.log("no audio, returing : -1")
    return -1;
  } catch (e){
    return -1;
  }
  
};
getAudioDidRecentlyFinish = async () => {
  if (audio !== null) {
    const status = await audio.getStatusAsync();
    return status.didJustFinish;
  }
  return false;
};
setAudioPlaybackStatusFunction = (fun) => {
  try {
    if (audio !== null) {
      audio.setOnPlaybackStatusUpdate(fun);
    }
  } catch (e) {
    console.log("setAudioPlaybackStatusFunction error...")
  }
};
// TODO fix error handling
getAudioStatus = async () => {
  if (audio !== null) {
    return await audio.getStatusAsync();
  }
  return null;
};
getAudio = () => audio;
getRecording = () => recording;
setAudio = (newAudio) => {
  audio = audio;
};
setAudioWithUrl = async (audioURL) => {
  if (audio !== null) {
    await audio.unloadAsync();
    audio = null;
  }
  // WIP
  const dl = FileSystem.createDownloadResumable(
    audioURL,
    `${FileSystem.documentDirectory}currentAudio.mp3`,
  );
  try {
    const uri = await dl.downloadAsync();
    console.log('Finished downloading to ', uri); // TODO: REMOVE CONSOLE LOG
    audio = new Audio.Sound();
    await audio.loadAsync(uri, {}, null, true);
  } catch (e) {
    console.log("setting audio error (setAudioWithUrl): " + e);
  }    
}
setAudioWithUri = async (audioURI) => {
  try {
    if (audio !== null){
      await audio.unloadAsync();
      audio = null;  
    }
    audio = new Audio.Sound();
    await audio.loadAsync(audioURI, {}, null, true);
  } catch (e){
    console.error("Error setting audio (setAudioWithUri): " + e);
  }
}
// TODO if audio is already running replay it.
// Start playing at a time
startPlayingAtTime = async (ms) => {
  try {
    if (audio !== null) {
      //console.log('Audio Exists');
      if (playing) {
        await audio.stopAsync();
      }
      playing = true;
      paused = false;
      await audio.setPositionAsync(ms);
      audio.playAsync();
      console.log('Audio playing');
    }
    console.log('startPlayingAtTime finished running');
  } catch (e) {
    console.log("startPlayingAtTime error: " + e)
  }
};
// TODO add handling of non looping audio
playAudio = async () => {
  if (audio !== null) {
    //console.log('Audio Exists');
    if (!playing) {
      playing = true;
      audio.playAsync();
      console.log('Audio playing');
    } else if (paused) {
      paused = false;
      audio.playAsync();
    } else {
      await audio.stopAsync();
      playing = true;
      audio.playAsync();
      console.log('Audio Playing');
    }
  }
  console.log('Play Audio finished running');
};
pauseAudio = async () => {
  try {
  if (audio !== null) {
    //console.log('Audio Exists');
    if (playing) {
      if (paused) {
        paused = false;
        audio.playAsync();
      } else {
        paused = true;
        audio.pauseAsync();
      }
    }
  }
  console.log('Pause Audio finished running');
  } catch (e) {
    console.log("Error in pauseAudio...")
  }
};

forcePauseAudio = async () => {
  try {
  if (audio !== null) {
    //console.log('Audio Exists');
    paused = true;
    audio.pauseAsync();
  }
  console.log('Force Pause Audio finished running');
  } catch (e) {
    console.log("Error in pauseAudio...")
  }
};

stopAudio = async () => {
  if (audio !== null) {
    //console.log('Audio Exists');
    if (playing) {
      playing = false;
      audio.stopAsync();
      console.log('Audio Stopped');
    }
  }
  console.log('Stop Audio finished running');
};

