const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = "myproject";
const Sentiment = require('sentiment');
var cors = require('cors')

var app = Express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));


var database, collection;


app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("documents");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});


const sent = tweet => {
    var sentiment = new Sentiment();
    var result = sentiment.analyze(tweet);
    return result;
};

app.get("/documents", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        //Iterarr result y anadir sentiment
        const tweetsWithSentiment = result.map(tweet => {

            const sentiment = sent(tweet.body);
            return {
                ...tweet,
                sentiment: sentiment.score
            }
        });


        response.send(tweetsWithSentiment);
    });
});
