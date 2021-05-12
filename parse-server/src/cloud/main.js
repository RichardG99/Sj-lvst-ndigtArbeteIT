const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
​
const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'X8ZVJHf4nhZ-bSNy72vsbXSvruT1dbYqRhYhPy1qh1nV',
  }),
  serviceUrl: 'https://api.eu-de.speech-to-text.watson.cloud.ibm.com/instances/b21c4259-c531-453f-aed5-044be6ef3995',
});
​
/* In the client you need to create this object and send it as params
const params = {
  objectMode: true,
  audio: "filename",
  contentType: 'audio/flac',
  model: 'en-US_BroadbandModel',
  keywords: ['colorado', 'tornado', 'tornadoes'],
  keywordsThreshold: 0.5,
  maxAlternatives: 3,
};*/
​
Parse.Cloud.define('speechToText', async (req, res) => {
​
  const params = {
    audio: fs.createReadStream('/home/unroot/audio-file.flac'),
    contentType: 'audio/flac',
    wordAlternativesThreshold: 0.9,
    model: 'en-US_BroadbandModel',
    keywords: ['colorado', 'tornado', 'tornadoes'],
    keywordsThreshold: 0.5,
  };
  
speechToText.recognize(params)
  .then(speechRecognitionResults => {
    return JSON.stringify(speechRecognitionResults, null, 2);
  })
  .catch(err => {
    console.log('error:', err);
    throw err;
  });
});