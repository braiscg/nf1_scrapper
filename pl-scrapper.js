var express = require("express");
var mongoskin = require("mongoskin");
var bodyParser = require("body-parser");
var app = express();
var db = mongoskin.db("mongodb://@localhost:27017/myproject", {safe:true});
    var id = mongoskin.helper.toObjectID;
var allowMethods = function(req, res, next) {
    res.header('Access-Control-Allow-Methods', "GET"); next();
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.param('coleccion', function(req, res, next, coleccion){
    req.collection = db.collection(coleccion);
    return next();
});

app.get('/api/:coleccion', auth, function(req, res, next) { req.collection.find({},{
    limit:10, sort: [['_id',-1]] }).toArray(function(e, results){
    if (e) return next(e);
    res.send(results);
});
});

app.listen(80, function(){
    console.log ('Servidor escuchando en puerto 8080');
});
