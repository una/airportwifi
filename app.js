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

    if(!newAirport.name || !newAirport.description) {
      res.sendStatus(400);
      return false;
    }

    client.hset('airports', newAirport.name, newAirport.description, function(error) {
      if(error) throw error;

      res.status(201).json(newAirport.name);
    });
});

app.delete('/airports/:name', function(req, res) {
  client.hdel('airports', req.params.name, function(err) {
    if(err) throw err;
    res.sendStatus(204);
  });
});

app.get('/airports/:name', function(req, res) {
  client.hget('airports', req.params.name, function(err, description) {
    if(err) throw err;
    res.render('show.ejs', {
        airport: {
          name: req.params.name,
          desc: req.params.description}
      });
  });
});

module.exports = app;