var Sentiment = require('sentiment');

export default tweet => {
    var sentiment = new Sentiment();
    var result = sentiment.analyze('Cats are stupid.');
    console.dir(result);
    return result;
};
