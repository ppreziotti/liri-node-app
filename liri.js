// GLOBAL VARIABLES
// ==================================================================================
var twitter = require("twitter");
var keys = require("./keys.js");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");
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
  	// Pulling the tweet's text and time they were created at from the appropriate
  	// screen name...need to update to last 20 once I have enough tweets
  	for (var i = 0; i < tweets.length; i++) {
	    console.log(tweets[i].text);
	    console.log(tweets[i].created_at);
  	}
  });
  logData();
}

function getSong() {
  var args = process.argv;
  // If args.length equals 3 then no song was entered, use the spotify API lookup method
  // in order to default to "The Sign" by Ace of Base
  if (args.length === 3) {
  	var songId = "0hrBpAOgrt8RXigk83LLNE";
  	spotify.lookup({type: 'track', id: songId}, function(err, data) {
  	  if (err) {
  	  	console.log(err);
  	  }
  	  // Display the artist name, song name, preview link, and album name
	  console.log("Artist: " + data.artists[0].name);
	  console.log("Song: " + data.name);
	  console.log("Preview URL: " + data.preview_url);
	  console.log("Album: " + data.album.name);
  	});
  }
  // If a song was entered use the spotify API search method and return the first result
  else {
  	var inputArray = [];
	  for (var i = 3; i < args.length; i++) {
      inputArray.push(args[i]);
    }
  	var song = inputArray.join(" ");
	  spotify.search({type: 'track', query: song}, function(err, data) {
   	  if (err) {
   	    console.log(err);
  	  }
  	  // Display the artist name, song name, preview link, and album name
  	  console.log("Artist: " + data.tracks.items[0].artists[0].name);
  	  console.log("Song: " + data.tracks.items[0].name);
  	  console.log("Preview URL: " + data.tracks.items[0].preview_url);
  	  console.log("Album: " + data.tracks.items[0].album.name);
  	});
  }
  logData();
}

function getMovie() {
  var args = process.argv;
  // If args.length equals 3 then no movie was entered, defualt to "Mr. Nobody"
  if (args.length === 3) {
  	var movieId = "tt0485947";
  	request("http://www.omdbapi.com/?i=" + movieId + "&r=json&tomatoes=true", function(error, response, body) {
  	  if (!error && response.statusCode === 200) {
  	  	console.log("Title: " + JSON.parse(body).Title);
  	  	console.log("Year: " + JSON.parse(body).Year);
  	  	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
  	  	console.log("Country: " + JSON.parse(body).Country);
  	  	console.log("Language: " + JSON.parse(body).Language);
  	  	console.log("Plot: " + JSON.parse(body).Plot);
  	  	console.log("Actors: " + JSON.parse(body).Actors);
  	  	console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
  	  }
  	  else {
  	  	console.log(error);
  	  }
  	});
  }
  else {
  	var inputArray = [];
  	for (var i = 3; i < args.length; i++) {
  	  inputArray.push(args[i]);
  	}
    var movieTitle = inputArray.join(" ");
  	request("http://www.omdbapi.com/?t=" + movieTitle + "&r=json&tomatoes=true", function(error, response, body) {
  	  if (!error && response.statusCode === 200) {
  	  	console.log("Title: " + JSON.parse(body).Title);
  	  	console.log("Year: " + JSON.parse(body).Year);
  	  	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
  	  	console.log("Country: " + JSON.parse(body).Country);
  	  	console.log("Language: " + JSON.parse(body).Language);
  	  	console.log("Plot: " + JSON.parse(body).Plot);
  	  	console.log("Actors: " + JSON.parse(body).Actors);
  	  	console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
  	  }
  	  else {
  	  	console.log(error);
  	  }
  	});
  }
  logData();
}

// Reads the random.txt file and converts its content into a node command
function doRandom() {
  process.argv = ["node", "liri.js",];
  fs.readFile("./random.txt", "utf-8", function(error, data) {
  	if (error) {
  	  console.log(error);
  	}
  	var text = data.split(",");
  	for (var i = 0; i < text.length; i++) {
  	  process.argv.push(text[i]);
  	}
  	input = process.argv[2];
  	if (input === "my-tweets") {
  	  getTweets();
    }
	  if (input === "spotify-this-song") {
  	  getSong();
	  }
	  if (input === "movie-this") {
  	  getMovie();
	  }
  });
  logData();
}

// Appends the output data for a command to the log.txt file
// Work in progress - currently using "Succesfully logged!" as a placeholder
function logData() {
  fs.appendFile("./log.txt", "Succesfully logged!", function(error) {
    if (error) {
      console.log(error);
    }
    else {
      console.log("Succesfully logged!");
    }
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

if (input === "movie-this") {
  getMovie();
}

if (input === "do-what-it-says") {
  doRandom();
}