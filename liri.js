require("dotenv").config();
var fs = require('fs');

var twitter = require('twitter')
var request = require('request')
var spotify = require('node-spotify-api')
var key = require('./keys.js');


var spotify = new spotify(key.spotify);
var client = new twitter(key.twitter);
var commands = process.argv[2];

switch (commands) {
    case 'my-tweets':
        myTweets()
        break;
    case 'spotify-this-song':
        spotifySong()
        break;
    case 'movie-this':
        movieThis()
        break;
    case 'do-what-it-says':
        doIt()
        break;
}

function myTweets() {
    var parameter = { screen_name: 'pujpuj33', count: 20 }
     client.get('statuses/user_timeline', parameter, function (error, tweets, response) {
        for (var i = 0; i < tweets.length; i++) {
            if (!error) {
                console.log("Date: " + tweets[i].created_at)
                console.log("Tweet" + tweets[i].text)
                console.log("======================")
            }
            fs.appendFile('log.txt', ("Date: " + tweets[i].created_at + "\nTweet: " + tweets[i].text + "\n"), function(error){
                if (error) {console.log(error)}
            })
        }
    })
}

function spotifySong() {
    var whatSong = process.argv[3]
        if(whatSong === undefined) {
            console.log("Freebird")
        }
    spotify.search({ type: 'track', query: whatSong}, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

    var spotifyResponse = data.tracks.items;
        console.log("======================")    
        console.log("Artist: " + spotifyResponse[0].artists[0].name)
        console.log("Song: " + spotifyResponse[0].name)
        console.log("Link: "+ spotifyResponse[0].album.external_urls.spotify)
        console.log("Album: " + spotifyResponse[0].album.name)
        console.log("======================")

        
        })
    }


function movieThis () {
    var movie = process.argv[3];

    request = ('http://www.omdbapi.com/?apikey=trilogy&t='+ movie +'&plot=full', function (error, response, body){
        if(e){
            console.log('error: ', error)
        }
        if (response.statusCode === 200) {
            var movieObject = JSON.parse(body);
            console.log(
              "Title: " + movieObject.Title + " , " +
              "Year: " + movieObject.Year + " , " +
              "Rating: " + movieObject.imdbRating + " , " +
              "Actors: " + movieObject.Actors + " , " +
              "Plot: " + movieObject.Plot
            )
        }

    })
}

function doIt() {
    fs.readFile('random.txt','utf8', function(err,data) {
      if (err){
          console.log(err)
      }else {
          console.log(data)
      }
    })
}