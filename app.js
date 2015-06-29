var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/airports', function(req,res) {
  var airports = ['Austin', 'Nashville'];
  res.json(airports);
});

app.post('/airports', function(req, res){
  res.sendStatus(201);
});

module.exports = app;