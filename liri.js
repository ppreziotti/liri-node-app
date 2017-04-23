// GLOBAL VARIABLES
// ==================================================================================
var twitter = require("twitter");
var keys = require("./keys.js");
var spotify = require("spotify");
var request = require("request");
var input = process.argv[2];

// FUNCTIONS
// ==================================================================================
function getTweets() {
  // Importing twitter keys
  var client = new twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });
  var params = {screen_name: 'fakeAccount0090'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (error) {
      console.log(error);
  	}
  	// Pulling the tweet's text and time they were created at...need to update 
  	// to last 20 once I have enough tweets
  	for (var i = 0; i < tweets.length; i++) {
	  console.log(tweets[i].text);
	  console.log(tweets[i].created_at);
  	}
  });
}

function getSong() {
  var args = process.argv;
  var inputArray = [];
  for (var i = 3; i < args.length; i++) {
  	inputArray.push(args[i]);
  }
  var song = inputArray.join(" ");
  console.log(song);
  spotify.search({type: 'track', query: song}, function(err, data) {
  	if (err) {
  	  console.log(err);
  	}
	console.log(data.tracks.items[0].artists[0].name);
	console.log(data.name);
	console.log(data.preview_url);
	console.log(data.album);
  });
}

// MAIN PROCESS
// ==================================================================================
if (input === "my-tweets") {
  getTweets();
}

if (input === "spotify-this-song") {
  getSong();
}
