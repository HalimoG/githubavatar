var request = require('request');

var gitToken = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization':gitToken.GITHUB_TOKEN
        }
      };
    request(options, function(err, res, body) {
        var parsedBody = JSON.parse(body);
        cb(err, parsedBody);
    });
  }

  getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    result.forEach(function(contributor){
        console.log(contributor.avatar_url)

    })
  });

  function downloadImageByURL(url, filePath) {
    var fs = require('fs');
    request.get(url).pipe(fs.createWriteStream(filePath));         
  }

  downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");
