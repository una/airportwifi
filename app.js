// app stuff :)
var express = require('express');
var app = express();

// url encoding for submission data
var bodyParser = require('body-parser');
var urlEncode = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + '/public'));

// Redis connection
var redis = require('redis');
if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = redis.createClient();
  client.select((process.env.NODE_ENV || 'development').length);
}

app.get('/airports', function(req,res) {
  client.hkeys('airports', function(err, names) {
    if(err) throw err;
    res.json(names);
  });
});

app.post('/airports', urlEncode, function(req, res){
    var newAirport = req.body;
    client.hset('airports', newAirport.name, newAirport.description, function(err) {
        if(err) throw err;
        res.status(201).json(newAirport.name);
    });
});

module.exports = app;