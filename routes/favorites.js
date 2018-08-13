const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const connectionString = 'postgres://localhost:5433/patrickkahnke';

const pool = new Pool({
  connectionString: connectionString,
})

router.post('/', function (req, res) {
  let favorite = req.body;
  pool.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    pool.query('INSERT INTO favorites (title, videoid, thumbnail, date_added) ' +
                  'VALUES ($1, $2, $3, $4)',
                   [favorite.title, favorite.videoId, favorite.thumbnail, favorite.date_added],
     function (err, result) {
        done();

        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(201);
      });
  });
});

router.get('/', (req, res) => {
  pool.connect((err, client, done) => {
    console.log('pool.connect firing');
    pool.query('SELECT * FROM favorites', (err, results) => {
      done();
      if (err) {
        throw err
      } else {
        console.log('results.rows:', results.rows);
        return res.send(results.rows);
      }
    })
  });
});
//
// router.get('/', function (req, res) {
//   pool.connect(connectionString, function (err, client, done) {
//     if (err) {
//       res.sendStatus(500);
//     } else if (req.query.search == 0) {
//       pool.query('SELECT * FROM favorites', function (err, result) {
//         done();
//         res.send(result.rows);
//       });
//     } else {
//       pool.query('SELECT * FROM favorites ' +
//                     'JOIN favorites_search_words ' +
//                     'ON favorites.favorite_id=favorites_search_words.favorite_id ' +
//                     'WHERE search_word_id=' + req.query.search,
//                     function (err, result) {
//         done();
//         res.send(result.rows);
//       });
//     };
//   });
// });

router.delete('/:favorite_id', function (req, res) {
  var id = req.params.favorite_id;
  pool.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    pool.query('DELETE FROM favorites ' +
                  'WHERE favorite_id = $1',
                   [id],
     function (err, result) {
        done();

        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
  });
});

module.exports = router;
