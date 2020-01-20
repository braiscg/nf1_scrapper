const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://twitter.com/FT';
const recoveredTweets = [];
axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const tweets = $('.tweet');
        tweets.each(function () {
            const user = $(this).find('.fullname').text();
            const body = $(this).find('.tweet-text').text();
            const time = $(this).find('._timestamp').attr('data-time-ms');
            const time2 = $(this).find('.tweet-timestamp').attr('title');
            recoveredTweets.push({
                user,
                body,
                time,
                time2
            })
        });
        //console.log(recoveredTweets);
        write(recoveredTweets);
    })
    .catch(console.error);

function write(recoveredTweets) {
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');// Connection URL
    const urldb = 'mongodb://127.0.0.1:27017';// Database Name
    const dbName = 'myproject';// Create a new MongoClient
    const client = new MongoClient(urldb);
    const insertDocuments = function (db, callback) {
        // Get the documents collection
        const collection = db.collection('documents');
        // Insert some documents
        collection.insertMany(recoveredTweets, function (err, result) {
            assert.equal(err, null);
            console.log("Inserted 3 documents into the collection");
            callback(result);
        });
    };


    const findDocuments = function (db, callback) {
        // Get the documents collection
        const collection = db.collection('documents');
        // Find some documents
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            callback(docs);
        });
    };// Use connect method to connect to the Server
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        insertDocuments(db, function () {
            findDocuments(db, function () {
                client.close();
            });
        });
    });
}
