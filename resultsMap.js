// url = d.results[n][MediaUrl]
// snippet = d.results[n][Title]
// thumbnail = d.results[n][Thumbnail][MediaUrl]
// context = d.results[n][SourceUrl]

function resultsMap(input) {
  return input.d.results.map(function (el) {
    return {
      'url': el.MediaUrl,
      'snippet': el.Title,
      'thumbnail': el.Thumbnail.MediaUrl,
      'context': el.SourceUrl
    };
  });
}

module.exports = resultsMap;
