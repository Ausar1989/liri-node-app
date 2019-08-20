
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment')
var fs = require("fs");
var spotify = new Spotify(keys.spotify);



const [node, file, ...args] = process.argv;


if (args[0] === "movie-this") {
    if (args[1] === undefined) {
        getMovie("Mr.+Nobody");
    }
    else {
        getMovie(args.slice(1).join(" "));
    }
};


if (args[0] === "spotify-this-song") {
    if (args[1] === undefined) {
        spotifySong("Walk This Way");
    }
    else {
        var songTitle = args.slice(1).join("+");
        spotifySong(songTitle);
    }
};

if (args[0] === "concert-this") {
    if (args[1] === undefined) {
        getConcert("Bad World Tour");
    }
    else {
        getConcert(args.slice(1).join(" "));
    }
};

if (args[0] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        
        if (error) {
            return console.log(error)
        }
        
        dataArr = data.split(",");
        if(dataArr[0] === "movie-this") {
            if (dataArr[1] === undefined) {
                getMovie("Mr.+Nobody")
            }
            else {
                getMovie(dataArr[1].split().join("+")) 
                
            }
        };
        
        if (dataArr[0] === "spotify-this-song") {
            if (dataArr[1] === undefined) {
                spotifySong("Walk This Way");
            }
            else {
                spotifySong(dataArr[1]);
            }
        };
        
        if (dataArr[0] === "concert-this") {
            if (dataArr[1] === undefined) {
                getConcert("Bad World Tour");
            }
            else {
                ;
                getConcert(dataArr[1].slice().join("+"));
            }
        };
        
    });
};

function spotifySong(songName) {
    spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        data.tracks.items.forEach(function (data) {
            console.log("");
            console.log(`Artist: ${data.artists[0].name}`); 
            console.log(`Song: ${songName}`);
            console.log(`Spotify Preview Link: ${data.preview_url}`);
            console.log(`Album: ${data.album.name}`);
        });
    })
};

function getMovie(movieName) {
    axios.get(`http://omdbapi.com/?t=${movieName}&apikey=trilogy`)
    .then(function (movie) {
          
        console.log("");
        console.log(`Title: ${movie.data.Title}`);
        console.log(`Released: ${movie.data.Year}`);
        console.log(`IMDB Rating: ${movie.data.Ratings[0].Value}`);
        console.log(`Rotten Tomatoes Rating: ${movie.data.Ratings[1].Value}`);
        console.log(`Produced In: ${movie.data.Country}`);
        console.log(`Plot: ${movie.data.Plot}`);
        console.log(`Starring: ${movie.data.Actors}`);
    })
    .catch(function (err) {
        console.log(err);
    });
};
var value = process.argv[1];
var bandName = value; 
     
 function getConcert() {
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(
        function(bandResponse){
            console.log("Venue: " + bandResponse.data[0].venue.name);
            console.log("City: " + bandResponse.data[0].venue.city);
            console.log(moment(bandResponse.data[0].datetime).format("MM/DD/YYYY"));
    
        })
        .catch(function (err) {
            console.log(err);
        });
     };  


      