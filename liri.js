var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var config = require('./keys.js');


var T = new Twitter(config);

var pro = process.argv;

my_Tweets = function () {
    var params = {
        screen_name: 'jjjuj20'
    };
    T.get('statuses/user_timeline', params, function (error, tweets, response) {
        for (i = 0; i < tweets.length; i++)
            console.log('Time: ' + tweets[i].created_at + '| Tweet: ' + tweets[i].text);

    });
};

function check() {

    if (pro[2] === 'do_what_it_says') {
        do_what_it_says();
    }

    if (pro[2] === 'spotifyThisSong') {
        spotifythissong();
    }


    if (pro[2] === 'myTweets') {
        my_Tweets();
    };

    if (pro[2] === 'movie_this') {
        movie_this();
    }

};

var spotify = new Spotify({
    id: '35a61f37280a4f26bc8857ef8e7faff4',
    secret: 'fd1154bc088640a48506670e8f7539b5',
});

var querysong = pro[3];


spotifythissong = function () {
    
    if (querysong === undefined) {
        querysong = "The Sign";
    }

    spotify.search({
        type: 'track',
        query: querysong
    }, function (err, data) {


        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            var songInfo = data.tracks.items[0];
            console.log(songInfo.artists[0].name)
            console.log(songInfo.name)
            console.log(songInfo.album.name)
            console.log(songInfo.preview_url)

        };
    });
}

var movieQuery = pro[3];
var movies = [];


var movie_this = function(){

    if (movieQuery === undefined) {
        movieQuery = 'Mr. Nobody.';
    }
    
    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieQuery, function (error, response, body) {
    movies.push(JSON.parse(body));  
    console.log('Title: ' + movies[0].Title + '\nYear: ' + movies[0].Year + '\nIMDRating: ' + movies[0].imdbRating + 
    '\nCountry of Production: ' + movies[0].Country + '\nLanguage: ' + movies[0].Language + '\nPlot: ' + movies[0].Plot + '\nActors: ' + movies[0].Actors );

    })};



var do_what_it_says = function() {
    fs.readFile('./random.txt', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
      });
}








check();


