



const express = require('express');
const router = express.Router();
const { upload, voiceToText } = require('../controllers/voiceController');

router.post('/voice-to-text', upload.single('audio'), voiceToText);

module.exports = router;