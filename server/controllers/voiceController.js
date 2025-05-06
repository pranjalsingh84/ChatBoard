const multer = require('multer');
const speech = require('@google-cloud/speech');
const { analyzeSentiment } = require('../utils/sentimentAnalyzer'); // your own function

const upload = multer({ storage: multer.memoryStorage() });

const client = new speech.SpeechClient({
  keyFilename: './config/googleServiceKey.json',
});

const voiceToText = async (req, res) => {
  const audioBytes = req.file.buffer.toString('base64');

  const audio = { content: audioBytes };
  const config = { encoding: 'WEBM_OPUS', languageCode: 'en-US' };
  const request = { audio, config };

  try {
    const [response] = await client.recognize(request);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
    const sentimentScore = await analyzeSentiment(transcription);

    res.status(200).json({ text: transcription, sentiment: sentimentScore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Voice processing failed" });
  }
};

module.exports = { upload, voiceToText };
