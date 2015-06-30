// app stuff :)
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var airports = require('./routes/airports');
app.use('/airports', airports);

module.exports = app;