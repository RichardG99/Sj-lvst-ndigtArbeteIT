const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'X8ZVJHf4nhZ-bSNy72vsbXSvruT1dbYqRhYhPy1qh1nV',
  }),
  serviceUrl: 'https://api.eu-de.speech-to-text.watson.cloud.ibm.com/instances/b21c4259-c531-453f-aed5-044be6ef3995',
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