var args = process.argv.slice(2);
var request = require('request');
var gitToken = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoOwner || !repoName){
    console.log("Please provide repository owner and repository name");
    }else {
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
}

getRepoContributors(args[0],args[1] , function(err, result) {
  result.forEach(function(contributor){
    console.log("Downloading image");
    var fs = require('fs');
    downloadImageByURL(contributor.avatar_url, `avatars/${contributor.login}.jpg`);    
  })
  console.log("Download complete")
});


function downloadImageByURL( url, filePath) {
  var fs = require('fs');
  request.get(url).pipe(fs.createWriteStream(filePath));         
  
}
