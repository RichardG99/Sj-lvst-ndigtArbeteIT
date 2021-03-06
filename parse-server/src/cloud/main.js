/*  ------------------------------------IBM Solution------------------------------------

Requires: Functional IBM Account with API keys

const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'X8ZVJHf4nhZ-bSNy72vsbXSvruT1dbYqRhYhPy1qh1nV', // Put your IBM Watson speech-to-text API-key here. See 'before you begin' here: https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-gettingStarted
  }),
  serviceUrl: 'https://api.eu-de.speech-to-text.watson.cloud.ibm.com/instances/b21c4259-c531-453f-aed5-044be6ef3995', // Put your IBM service-URL here. 
});

function randName(low, high) {
  const seed = Math.floor(Math.random() * (high - low) + low);
  return 'voice/' + seed.toString(36) + '.webm';
}

Parse.Cloud.define('speechToTextCall', async (req, res) => {
  let base64data = req.params.audio;
  const filename = randName(10000, 99999);
  fs.writeFileSync(filename, Buffer.from(base64data.replace('data:audio/webm; codecs=opus;base64,', ''), 'base64'));
  const recognizeParams = {
    audio: fs.createReadStream(filename),
    contentType: 'audio/webm',
    wordAlternativesThreshold: 0.9,
    model: 'en-US_BroadbandModel',
    keywords: req.params.keywords,
    keywordsThreshold: 0.5,
    endOfPhraseSilenceTime: 6.0,
  };
  
return speechToText.recognize(recognizeParams)
  .then(speechRecognitionResults => {
    fs.unlinkSync(filename)
    return JSON.stringify(speechRecognitionResults, null, 2);
  })
  .catch(err => {
    fs.unlinkSync(filename)
    console.log('error:', err);
    return "err";
  });
});
*/

const speech = require('@google-cloud/speech');
import GOOGLE_APPLICATION_CREDENTIALS from "./speech_to_text_key"


Parse.Cloud.define('speechToTextCall', async (req, res) => {
  const client = new speech.SpeechClient({
    credentials: {
      private_key: GOOGLE_APPLICATION_CREDENTIALS.private_key,
      client_email: GOOGLE_APPLICATION_CREDENTIALS.client_email,
    },
    project_id: GOOGLE_APPLICATION_CREDENTIALS.project_id,
  });
  const audio = {
    content: req.params.audio_base64,
  };

  /* ------------------------------------OS specific handling------------------------------------*/
  const android = req.params.OS === 'andriod';
  const ios = req.params.OS === 'ios';

  // Default Android, due to it being the most common type of config between different OS
  // Default config
  let config = {
    encoding: 'AMR_WB',
    sampleRateHertz: 16000, // 44100
    languageCode: 'en-US',
  };
  // Ios config
  if (ios) {
    config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 44100, // 44100
      languageCode: 'en-US',
    };
  }
  /* ------------------------------------OS specific handling------------------------------------*/

  const request = {
    audio,
    config,
  };

  const [googleRes] = await client.recognize(request);

  if (googleRes.results.length !== 0) {
    return {
      finishedTranscript: googleRes.results[0].alternatives[0].transcript,
      transcriptSuccess: 1,
    };
  }
  return {
    finishedTranscript: "Didn't Work",
    transcriptSuccess: -1,
  };
});