const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const analyzeSentiment = (text) => {
  const result = sentiment.analyze(text);
  return result.score;  // it will return -5 to +5 score
};

module.exports = { analyzeSentiment };
