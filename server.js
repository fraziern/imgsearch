process.env.NODE_ENV = 'test';

var express = require('express');
var mongoose = require('mongoose');
require('dotenv').config();
var config = require('./_config');
var request = require('request');
var resultsMap = require('./resultsMap');

var app = express();

var key = process.env.BING_KEY;

var rootURI = 'https://api.datamarket.azure.com/Bing/Search/Image?Query=%27';
var suffixURI = '%27&$format=json';
var offsetURI = '&$skip=';
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

app.get('/api/imagesearch/:id', function (req, res) {
  // console.log('id: ' + req.params.id);
  // console.log('query: ' + JSON.stringify(req.query));
  var offset = (req.query.offset) ? offsetURI + req.query.offset : '';
  request(
    {
      url: rootURI + req.params.id + suffixURI + offset,
      headers: {
        'Authorization' : auth
      }
    },
    function (err, response, body) {
      res.json(resultsMap(JSON.parse(body)));
    }
  );
});

app.get('/api/latest/imagesearch', function (req, res) {
  res.send('Hi again.');
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
  console.log('Node.js listening on port ' + port + '...');
});
