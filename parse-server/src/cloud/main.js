const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'X8ZVJHf4nhZ-bSNy72vsbXSvruT1dbYqRhYhPy1qh1nV',
  }),
  serviceUrl: 'https://api.eu-de.speech-to-text.watson.cloud.ibm.com/instances/b21c4259-c531-453f-aed5-044be6ef3995',
});

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

Parse.Cloud.define('speechToTextCall', async (req, res) => {
  let base64data = req.params.audio;
  fs.writeFileSync('file.webm', Buffer.from(base64data.replace('data:audio/webm; codecs=opus;base64,', ''), 'base64'));
  const recognizeParams = {
    audio: fs.createReadStream('file.webm'),
    contentType: 'audio/webm',
    wordAlternativesThreshold: 0.9,
    model: 'en-US_BroadbandModel',
    keywords: req.params.keywords,
    keywordsThreshold: 0.5,
  };
  
return speechToText.recognize(recognizeParams)
  .then(speechRecognitionResults => {
    //return "halloj";
    //JSON.stringify(speechRecognitionResults, null, 2));
    return JSON.stringify(speechRecognitionResults, null, 2);
  })
  .catch(err => {
    console.log('error:', err);
    return "err";
  });
});