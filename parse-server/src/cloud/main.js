const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'X8ZVJHf4nhZ-bSNy72vsbXSvruT1dbYqRhYhPy1qh1nV',
  }),
  serviceUrl: 'https://api.eu-de.speech-to-text.watson.cloud.ibm.com/instances/b21c4259-c531-453f-aed5-044be6ef3995',
});

const params = {
  objectMode: true,
  contentType: 'audio/flac',
  model: 'en-US_BroadbandModel',
  keywords: ['colorado', 'tornado', 'tornadoes'],
  keywordsThreshold: 0.5,
  maxAlternatives: 3,
};

// Create the stream.
const recognizeStream = speechToText.recognizeUsingWebSocket(params);

// Pipe in the audio.
fs.createReadStream('audio-file.flac').pipe(recognizeStream);

/*
 * Uncomment the following two lines of code ONLY if `objectMode` is `false`.
 *
 * WHEN USED TOGETHER, the two lines pipe the final transcript to the named
 * file and produce it on the console.
 *
 * WHEN USED ALONE, the following line pipes just the final transcript to
 * the named file but produces numeric values rather than strings on the
 * console.
 */
// recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

/*
 * WHEN USED ALONE, the following line produces just the final transcript
 * on the console.
 */
// recognizeStream.setEncoding('utf8');

// Listen for events.
recognizeStream.on('data', function(event) { onEvent('Data:', event); });
recognizeStream.on('error', function(event) { onEvent('Error:', event); });
recognizeStream.on('close', function(event) { onEvent('Close:', event); });

// Display events on the console.
function onEvent(name, event) {
    console.log(name, JSON.stringify(event, null, 2));
};

///////////////////

/* const speech = require('@google-cloud/speech');

Parse.Cloud.define('hello', (req, res) => 'Hi');

Parse.Cloud.define('speechToText', async (req, res) => {
  const client = new speech.SpeechClient({
    credentials: {
      private_key: '',
      client_email: '',
    },
    project_id: '',
  });
  const audio = {
    content: req.params.audio_base64,
  };

  // ------------------------------------OS specific handling------------------------------------
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
  // ------------------------------------OS specific handling------------------------------------

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
Parse.Cloud.define('averageStars', async (request) => {
  console.log(request.params);
  return 1;
}); */
