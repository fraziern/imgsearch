var resultsMap = require('../resultsMap');
var chai = require('chai'),
  chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

var inputJSON = {
  "d": {
    "results": [{
      "__metadata": {
        "uri": "https://api.datamarket.azure.com/Data.ashx/Bing/Search/Image?Query='xbox'&$skip=0&$top=1",
        "type": "ImageResult"
      },
      "ID": "cde0b036-c168-4f30-a0c7-50b655d4c302",
      "Title": "The Complete History Of Xbox Live (Abridged) - Features - www ...",
      "MediaUrl": "http://media1.gameinformer.com/imagefeed/featured/microsoft/xboxlive/history/Xbox.jpg",
      "SourceUrl": "http://www.gameinformer.com/b/features/archive/2013/05/19/the-complete-history-of-xbox-live-abridged.aspx",
      "DisplayUrl": "www.gameinformer.com/b/features/archive/2013/05/19/the-complete...",
      "Width": "1277",
      "Height": "843",
      "FileSize": "87944",
      "ContentType": "image/jpeg",
      "Thumbnail": {
        "__metadata": {
          "type": "Bing.Thumbnail"
        },
        "MediaUrl": "http://ts3.mm.bing.net/th?id=OIP.M3df7d8bca09985bab9ac13799a3d75afH0&pid=15.1",
        "ContentType": "image/jpg",
        "Width": "480",
        "Height": "316",
        "FileSize": "12024"
      }
    }, {
      "__metadata": {
        "uri": "https://api.datamarket.azure.com/Data.ashx/Bing/Search/Image?Query='xbox'&$skip=1&$top=1",
        "type": "ImageResult"
      },
      "ID": "ad9a48b1-b777-44ec-929a-636811a2b557",
      "Title": "Description Xbox-360S-Console-Set.jpg",
      "MediaUrl": "http://upload.wikimedia.org/wikipedia/commons/7/76/Xbox-360S-Console-Set.jpg",
      "SourceUrl": "http://en.wikipedia.org/wiki/File:Xbox-360S-Console-Set.jpg",
      "DisplayUrl": "en.wikipedia.org/wiki/File:Xbox-360S-Console-Set.jpg",
      "Width": "2440",
      "Height": "3360",
      "FileSize": "2305578",
      "ContentType": "image/jpeg",
      "Thumbnail": {
        "__metadata": {
          "type": "Bing.Thumbnail"
        },
        "MediaUrl": "http://ts3.mm.bing.net/th?id=OIP.M3392fa71999bab35377d642c04bb846bo0&pid=15.1",
        "ContentType": "image/jpg",
        "Width": "217",
        "Height": "300",
        "FileSize": "5451"
      }
    }]
  }
};

var outputJSON = [
  {
    'url': 'http://media1.gameinformer.com/imagefeed/featured/microsoft/xboxlive/history/Xbox.jpg',
    'snippet': 'The Complete History Of Xbox Live (Abridged) - Features - www ...',
    'thumbnail': 'http://ts3.mm.bing.net/th?id=OIP.M3df7d8bca09985bab9ac13799a3d75afH0&pid=15.1',
    'context': 'http://www.gameinformer.com/b/features/archive/2013/05/19/the-complete-history-of-xbox-live-abridged.aspx'
  },
  {
    'url': 'http://upload.wikimedia.org/wikipedia/commons/7/76/Xbox-360S-Console-Set.jpg',
    'snippet': 'Description Xbox-360S-Console-Set.jpg',
    'thumbnail': 'http://ts3.mm.bing.net/th?id=OIP.M3392fa71999bab35377d642c04bb846bo0&pid=15.1',
    'context': 'http://en.wikipedia.org/wiki/File:Xbox-360S-Console-Set.jpg'
  }
];

it('responds to basic GET', function(done) {
  chai.request('http://localhost:8080')
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      done();
    });
});

it('converts raw Bing JSON to our API JSON', function() {
  var o = resultsMap(inputJSON);
  expect(o).to.be.instanceof(Array);
  expect(o).to.have.length(2);
  expect(o).to.deep.equal(outputJSON);
});
