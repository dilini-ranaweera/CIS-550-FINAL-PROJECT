const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

/******************
 * ROUTES *
 ******************/

// Route 1: GET /places/:email
// a route that given an email, returns all information about the place
const place = async function(req, res) {
  connection.query(`
    SELECT *
    FROM Saves S
    WHERE S.email = '${req.params.email}';
  `,
   (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
        res.json(data[0]);
    }
  });

}

// Route 2: GET /listings_in_price_range/:price
// A route that gets all the Listing (Airbnb and Craigslist) within a specific price range.

const listing_in_price_range = async function(req, res) {
  connection.query(`
    (SELECT Name, Price, Neighborhood, City, Last_review AS Date
      FROM Airbnb A JOIN Listing L ON A.id = L.id
      WHERE L.price <= ${req.params.price})
      UNION
      (SELECT Name, Price, Neighborhood, City, Date
      FROM Craigslist C JOIN Listing L ON C.id = L.id
      WHERE L.price <= ${req.params.price})
` ,
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
}

// Route 5: GET /listings_per_city
const listings_per_city = async function(req, res) {
  connection.query(`
  SELECT City, COUNT(*)
  FROM Listing
  GROUP BY City
  ORDER BY City   
` ,
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
        res.json(data)
    }
  });

}

// Route 6: GET /album_songs/:album_id
const album_songs = async function(req, res) {
  // TODO (TASK 7): implement a route that given an album_id, returns all songs on that album ordered by track number (ascending)

  connection.query(`
  SELECT S.song_id, S.title, S.number, S.duration, S.plays
  FROM Songs S
  WHERE S.album_id = '${req.params.album_id}'
  ORDER BY S.number ASC
` ,
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
        data_list = [];
        for(let i = 0; i < data.length; i++) {
          data_list.push(data[i]);
        }
        res.json(data_list);
    }
  });

}

/************************
 * ADVANCED INFO ROUTES *
 ************************/

// Route 7: GET /top_songs
const top_songs = async function(req, res) {
  const page = req.query.page;
  // TODO (TASK 8): use the ternary (or nullish) operator to set the pageSize based on the query or default to 10
  const pageSize = req.query.page_size ?? 10;

  if (!page) {
    // TODO (TASK 9)): query the database and return all songs ordered by number of plays (descending)
    // Hint: you will need to use a JOIN to get the album title as well
    
    connection.query(`
      SELECT S.song_id, S.title, A.album_id, A.title AS album, S.plays
      FROM Albums A, Songs S
      WHERE A.album_id = S.album_id
      ORDER BY S.plays DESC
  ` ,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
          data_list = [];
          for(let i = 0; i < data.length; i++) {
            data_list.push(data[i]);
          }
          res.json(data_list);
      }
    });

  } else {
    // TODO (TASK 10): reimplement TASK 9 with pagination
    // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)
    
    connection.query(`
      SELECT S.song_id, S.title, A.album_id, A.title AS album, S.plays
      FROM Albums A, Songs S
      WHERE A.album_id = S.album_id
      ORDER BY S.plays DESC
      LIMIT ${pageSize} 
      OFFSET ${(page - 1) * pageSize}
`   ,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
          data_list = [];
          for(let i = 0; i < data.length; i++) {
            data_list.push(data[i]);
          }
          res.json(data_list);
      }
    });
  }
}

// Route 8: GET /top_albums
const top_albums = async function(req, res) {
  // TODO (TASK 11): return the top albums ordered by aggregate number of plays of all songs on the album (descending), with optional pagination (as in route 7)
  // Hint: you will need to use a JOIN and aggregation to get the total plays of songs in an album

  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;

  if (!page) {
    connection.query(`
    WITH MegaTable AS (
      SELECT A.album_id AS album_id, A.title AS title, S.title AS song_title, S.plays AS plays
      FROM Albums A 
      JOIN Songs S
      ON A.album_id = S.album_id
    )

    SELECT album_id, title, SUM(plays) AS plays
    FROM MegaTable
    GROUP BY album_id, title
    ORDER BY SUM(plays) DESC
  ` ,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
          data_list = [];
          for(let i = 0; i < data.length; i++) {
            data_list.push(data[i]);
          }
          res.json(data_list);
        }
    });

  } else {   
    connection.query(`
      WITH MegaTable AS (
        SELECT A.album_id AS album_id, A.title AS title, S.title AS song_title, S.plays AS plays
        FROM Albums A 
        JOIN Songs S
        ON A.album_id = S.album_id
      )

      SELECT album_id, title, SUM(plays) AS plays
      FROM MegaTable
      GROUP BY album_id, title
      ORDER BY SUM(plays) DESC
      LIMIT ${pageSize} 
      OFFSET ${(page - 1) * pageSize}
`   ,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
          data_list = [];
          for(let i = 0; i < data.length; i++) {
            data_list.push(data[i]);
          }
          res.json(data_list);
      }
    });
  }
  
}

// Route 9: GET /search_albums
const search_songs = async function(req, res) {
  // TODO (TASK 12): return all songs that match the given search query with parameters defaulted to those specified in API spec ordered by title (ascending)
  // Some default parameters have been provided for you, but you will need to fill in the rest
  const title = req.query.title ?? '';
  const durationLow = req.query.duration_low ?? 60;
  const durationHigh = req.query.duration_high ?? 660;
  const playsLow = req.query.plays_low ?? 0;
  const playsHigh = req.query.plays_high ?? 1100000000;
  const danceabilityLow = req.query.danceability_low ?? 0;
  const danceabilityHigh = req.query.danceability_high ?? 1;
  const energyLow = req.query.energy_low ?? 0;
  const energyHigh = req.query.energy_high ?? 1;
  const valenceLow = req.query.valence_low ?? 0;
  const valenceHigh = req.query.valence_high ?? 1;
  const explicit = req.query.explicit ?? 0;

  if (title === '') {
    connection.query(`
      SELECT *
      FROM Songs S
      WHERE ${durationLow} <= S.duration AND ${durationHigh} >= S.duration
      AND S.explicit <= ${explicit}
      AND ${playsLow} <= S.plays AND ${playsHigh} >= S.plays
      AND ${danceabilityLow} <= S.danceability AND ${danceabilityHigh} >= S.danceability
      AND ${energyLow} <= S.energy AND ${energyHigh} >= S.energy
      AND ${valenceLow} <= S.valence AND ${valenceHigh} >= S.valence
      ORDER BY S.title ASC
    `   ,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json([]);
        } else {
            data_list = [];
            for(let i = 0; i < data.length; i++) {
              data_list.push(data[i]);
            }
            res.json(data_list);
        }
      });
  } else if (title) {
      connection.query(`
        SELECT *
        FROM Songs S
        WHERE ${durationLow} <= S.duration AND ${durationHigh} >= S.duration
        AND S.explicit <= ${explicit}
        AND ${playsLow} <= S.plays AND ${playsHigh} >= S.plays
        AND ${danceabilityLow} <= S.danceability AND ${danceabilityHigh} >= S.danceability
        AND ${energyLow} <= S.energy AND ${energyHigh} >= S.energy
        AND ${valenceLow} <= S.valence AND ${valenceHigh} >= S.valence
        AND S.title LIKE '%${title}%'
        ORDER BY S.title ASC
        `   ,
        (err, data) => {
          if (err || data.length === 0) {
            console.log(err);
            res.json([]);
          } else {
              data_list = [];
              for(let i = 0; i < data.length; i++) {
                data_list.push(data[i]);
              }
              res.json(data_list);
          }
      });
  }
}

module.exports = {
  place,
  listing_in_price_range,
  listings_per_city,
  album_songs,
  top_songs,
  top_albums,
  search_songs,
}
