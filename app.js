const express = require('express');
const cors = require('cors');
const { Pool } = require('pg')
const path = require('path');
const bodyParser = require('body-parser');
const env = require('./env.js');

const pool = new Pool({
  port: 5433
})

const app = express();

// middleware
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// modules
const favorites = require('./routes/favorites');
// var favoritesSearchWords = require('./routes/favoritesSearchWords');
// var searchWords = require('./routes/searchWords');
// var youtubeAPIKey = require('./routes/youtubeAPIKey');
// var index = require('./routes/index');


// express routes
app.use('/favorites', favorites);
// app.use('/favoritesSearchWords', favoritesSearchWords);
// app.use('/searchWords', searchWords);
// app.use('/youtubeAPIKey', youtubeAPIKey);
// app.use('/', index);

app.get('/', (req, res) => {
  res.send('hello');
});


// start server
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () => {
  console.log('listening on port ', app.get('port'));
});
