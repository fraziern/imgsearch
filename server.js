process.env.NODE_ENV = 'test';

var express = require('express');
var mongoose = require('mongoose');
require('dotenv').config();
var config = require('./_config');
var request = require('request');
var resultsMap = require('./resultsMap');

var app = express();

var key = process.env.BING_KEY;

var rootURI = 'https://api.datamarket.azure.com/Bing/Search/Image?Query=%27xbox%27&$format=json';
var auth = 'Basic ' + new Buffer(key + ':' + key).toString('base64');

// var Savedurl = require('./savedurl');
// var Counter = require('./counter');
//
// var prefix = config.prefixURL[app.settings.env];

mongoose.connect(config.mongoURI[app.settings.env], function (err) {
  if (err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

app.get('/', function (req, res) {
  res.send('Hi!');
});

app.get('/test/', function (req, res) {
  request(
    {
      url: rootURI,
      headers: {
        'Authorization' : auth
      }
    },
    function (err, response, body) {
      res.json(resultsMap(JSON.parse(body)));
    }
  );
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
  console.log('Node.js listening on port ' + port + '...');
});
