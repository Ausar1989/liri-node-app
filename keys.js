console.log('this is loaded');

//Holds my spotify keys
// console.log(process.env);

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

