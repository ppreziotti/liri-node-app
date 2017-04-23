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

// MAIN PROCESS
// ==================================================================================
if (input === "my-tweets") {
  getTweets();
}
