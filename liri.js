// GLOBAL VARIABLES
// ==================================================================================
var twitter = require("twitter");
var keys = require("./keys.js");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");
var command = process.argv[2];

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
  // Pulling tweets from my account, logging an error if there is one
  var params = {screen_name: 'fakeAccount0090'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (error) {
      console.log(error);
  	}
  	// Pulls the tweet's text and time at which it was created for my last 20 tweets
    // Each tweet is then pushed to an empty outputArray
    var outputArray = [];
  	for (var i = 0; i < 20; i++) {
	    outputArray.push(tweets[i].text);
	    outputArray.push(tweets[i].created_at);
  	}
    // Display the outputArray one element at a time on separate lines
    for (var i = 0; i < outputArray.length; i++) {
      console.log(outputArray[i]);
    }
    // Append the outputArray to log.txt
    logData(outputArray.join(", "));
  });
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
      // Create an empty array and then push the artist name, song name, preview link,
      // and album name to the array
      var outputArray = [];
	    outputArray.push("Artist: " + data.artists[0].name);
	    outputArray.push("Song: " + data.name);
	    outputArray.push("Preview URL: " + data.preview_url);
	    outputArray.push("Album: " + data.album.name);
      // Display the array one index at a time on separate lines
      for (var i = 0; i < outputArray.length; i++) {
        console.log(outputArray[i]);
      }
      // Append the outputArray to log.txt
      logData(outputArray.join(", "));
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
      // Create an empty array and push the artist name(s) to the array in case there are 
      // multiple artists
      var artistArray = [];
      for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
        artistArray.push(data.tracks.items[0].artists[i].name);
      }
      // Create an empty array and then push the joined artist array, the song name, 
      // preview link, and album name to the array
      var outputArray = [];
      outputArray.push("Artist: " + artistArray.join(", "));
      outputArray.push("Song: " + data.tracks.items[0].name);
      outputArray.push("Preview URL: " + data.tracks.items[0].preview_url);
      outputArray.push("Album: " + data.tracks.items[0].album.name);
  	  // Display the output array one element at a time on separate lines
  	  for (var i = 0; i < outputArray.length; i++) {
        console.log(outputArray[i]);
      }
      // Append the outputArray to log.txt
      logData(outputArray.join(", "));
  	});
  }
}

function getMovie() {
  var args = process.argv;
  // If args.length equals 3 then no movie was entered, defualt to "Mr. Nobody"
  if (args.length === 3) {
  	var movieId = "tt0485947";
  	request("http://www.omdbapi.com/?i=" + movieId + "&r=json&tomatoes=true", function(error, response, body) {
  	  if (!error && response.statusCode === 200) {
        // Create an empty array and push the required movie info to it
        var outputArray = [];
  	  	outputArray.push("Title: " + JSON.parse(body).Title);
  	  	outputArray.push("Year: " + JSON.parse(body).Year);
  	  	outputArray.push("IMDB Rating: " + JSON.parse(body).imdbRating);
  	  	outputArray.push("Country: " + JSON.parse(body).Country);
  	  	outputArray.push("Language: " + JSON.parse(body).Language);
  	  	outputArray.push("Plot: " + JSON.parse(body).Plot);
  	  	outputArray.push("Actors: " + JSON.parse(body).Actors);
  	  	outputArray.push("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
        // Display the output array one element at a time on separate lines
        for (var i = 0; i < outputArray.length; i++) {
          console.log(outputArray[i]);
        }
        // Append the outputArray to log.txt
        logData(outputArray.join(", "));
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
        // Create an empty array and push the required movie info to it
        var outputArray = [];
  	  	outputArray.push("Title: " + JSON.parse(body).Title);
  	  	outputArray.push("Year: " + JSON.parse(body).Year);
  	  	outputArray.push("IMDB Rating: " + JSON.parse(body).imdbRating);
  	  	outputArray.push("Country: " + JSON.parse(body).Country);
  	  	outputArray.push("Language: " + JSON.parse(body).Language);
  	  	outputArray.push("Plot: " + JSON.parse(body).Plot);
  	  	outputArray.push("Actors: " + JSON.parse(body).Actors);
  	  	outputArray.push("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
        // Display the output array one element at a time on separate lines
        for (var i = 0; i < outputArray.length; i++) {
          console.log(outputArray[i]);
        }
        // Append the outputArray to log.txt
        logData(outputArray.join(", "));
  	  }
  	  else {
  	  	console.log(error);
  	  }
  	});
  }
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
  	command = process.argv[2];
  	if (command === "my-tweets") {
  	  getTweets();
    }
	  if (command === "spotify-this-song") {
  	  getSong();
	  }
	  if (command === "movie-this") {
  	  getMovie();
	  }
  });
}

// Appends the command's output data to a new line in the log.txt file
function logData(output) {
  fs.appendFile("./log.txt", "\n" + output, function(error) {
    if (error) {
      console.log(error);
    }
  });
}

// MAIN PROCESS
// ==================================================================================
if (command === "my-tweets") {
  getTweets();
}

else if (command === "spotify-this-song") {
  getSong();
}

else if (command === "movie-this") {
  getMovie();
}

else if (command === "do-what-it-says") {
  doRandom();
}

else {
  console.log("Please enter a valid command.")
}