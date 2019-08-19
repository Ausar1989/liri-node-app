// The spotify Client ID and Secret ID weren't working for some reason.
// I had to delete the spotify constructor in order to get the movie this to work.


require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment')
var fs = require("fs");



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
        ;
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
        
        data.tracks.items.forEach(function (element) {
            console.log("");
            console.log(`Artist: ${element.artists[0].name}`); 
            console.log(`Song: ${songName}`);
            console.log(`Spotify Preview Link: ${elelement.preview_url}`);
            console.log(`Album: ${elelement.album.name}`);
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


function getConcert(concertName) {
    axios.get(`https://rest.bandsintown.com/artists/"${concertName}"/events?app_id=codingbootcamp`)
    .then(function (concert) {
            
                console.log(`Concert Time: " ${moment(concert.data.datatime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A')}`);
                console.log(`Concert Location: ${concert.data.venue.city + "," + concert.data.venue.region + "," + concert.data.venue.country}`);
                console.log(`Concert Venue: ${concert.data.venue.name}`);
              }) 
              .catch(function (err) {
                console.log(err);
            });
        };


      