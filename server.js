var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Search = require('./search');

require('dotenv').config();
var request = require('request');

var resultsMap = require('./resultsMap');

var key = process.env.BING_KEY;
var rootURI = 'https://api.datamarket.azure.com/Bing/Search/Image?Query=%27';
var suffixURI = '%27&$format=json';
var offsetURI = '&$skip=';
var auth = 'Basic ' + new Buffer(key + ':' + key).toString('base64');

// MONGODB CONNECTION
mongoose.connect(process.env.MONGODB_URI, function (err) {
  if (err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + process.env.MONGODB_URI);
  }
});

app.use(express.static(__dirname + '/public'));

// ROUTES
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
      var search = new Search({
        term: req.params.id,
        when: new Date()
      });
      search.save(function (err) {
        if (err) return console.error(err);
      });
      res.json(resultsMap(JSON.parse(body)));
    }
  );
});

app.get('/api/latest/imagesearch', function (req, res) {
  Search.find()
    .select('-_id -__v')
    .limit(10)
    .sort('-when')
    .exec(function (err, searches) {
      if (err) return console.error(err);
      res.json(searches);
    });
});

// START SERVER
var port = process.env.PORT || 8080;
app.listen(port,  function () {
  console.log('Node.js listening on port ' + port + '...');
});
