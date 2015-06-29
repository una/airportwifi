var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/airports', function(req,res) {
  var airports = ['Austin', 'Nashville'];
  res.json(airports);
});

module.exports = app;