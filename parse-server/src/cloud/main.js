
const speech = require('@google-cloud/speech');

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
Parse.Cloud.define('averageStars', async (request) => {
  console.log(request.params);
  return 1;
});
