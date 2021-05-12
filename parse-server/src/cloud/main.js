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


Parse.Cloud.define('speechToTextCall', async (req, res) => {
    // Create the stream.
    const recognizeStream = speechToText.recognizeUsingWebSocket(params);
    // Pipe in the audio.
    fs.createReadStream('/home/unroot/audio-file.flac').pipe(recognizeStream);

    // Listen for events.
    recognizeStream.on('data', function(event) { onEvent('Data:', event); });
    recognizeStream.on('error', function(event) { onEvent('Error:', event); });
    recognizeStream.on('close', function(event) { onEvent('Close:', event); });
};

// Display events on the console.
function onEvent(name, event) {
    console.log(name, JSON.stringify(event, null, 2));
};