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

// Route 1: GET /user_saves/:email
// a route that given an email, returns all the saves corresponding to that user
const user_saves = async function (req, res) {
  connection.query(`
  SELECT L.Name, L.Price, L.Neighborhood, L.City, 'AirBnB' AS ListingType
  FROM Saves S
  JOIN Airbnb A ON S.ListingID = A.ID
  JOIN Listing L ON A.ID = L.ID
  WHERE S.email = '${req.params.email}';
  `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });

}

// Route 2: GET /listings_in_price_range/:price
// A route that gets all the Listing (Airbnb and Craigslist) within a specific price range.

const airbnb_in_price_range = async function(req, res) {
  connection.query(`
    SELECT Name, Price, Neighborhood, City, 'airbnb' AS Type
      FROM Airbnb A JOIN Listing L ON A.id = L.id
      WHERE L.price <= ${req.query.price} AND L.city = '${req.query.city}' AND L.Name IS NOT NULL
` ,
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

const craigslist_in_price_range = async function(req, res) {
  connection.query(`
  SELECT Name, Price, Neighborhood, City, 'craigslist' AS Type
  FROM Craigslist C JOIN Listing L ON C.id = L.id
  WHERE L.price / 30 <= ${req.query.price} AND L.city = '${req.query.city}' AND L.Name IS NOT NULL
` ,
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 3: GET /listings_per_city
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

// Route 4: GET /average_price/:neighborhood
// Get the average price of Airbnb listings in a neighborhood.
const average_price = async function(req, res) {
  connection.query(`
  SELECT AVG(L.price)
  FROM Airbnb A JOIN Listing L ON A.id = L.id
  WHERE L.neighborhood = '${req.params.neighborhood}'

` ,
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
        res.json(data);
    }
  });

}


// Route 5: GET /top_neighborhoods/:city
// Get the top 5 neighborhoods with the cheapest rent in a city.
const top_neighborhoods = async function(req, res) {
  connection.query(`
  SELECT L.neighborhood, AVG(L.price) AS avg_price
  FROM Airbnb A JOIN Listing L ON A.id = L.id
  WHERE L.city = '${req.params.city}'
  GROUP BY L.neighborhood
  ORDER BY avg_price
  LIMIT 5 

` ,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });

}

// Route 6: GET /user_info/:email
// This route gets all associated user information.
const user_info = async function (req, res) {
  connection.query(`
  SELECT *
  FROM Users
  WHERE email = '${req.params.email}'

` ,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });

}

/************************
 * ADVANCED ROUTES *
 ************************/

// Route 7: GET /airbnb_no_craiglist
// This query selects all Airbnb listings in cities without craigslist
const airbnb_no_craiglist = async function(req, res) {
  connection.query(`
  WITH Cl AS (SELECT C.id, L.Name, L.Price, L.Neighborhood, L.City, C.Date
    FROM Craigslist C JOIN Listing L ON C.id = L.id),
No_Craig AS (SELECT City
FROM Airbnb A
    JOIN Listing L ON A.id = L.id
    WHERE NOT EXISTS(
    SELECT *
    FROM Cl C
    WHERE L.city = C.city
    ))
SELECT DISTINCT City
FROM No_Craig
` ,
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
        res.json(data);
    }
  });

}

const get_airbnb = async function(req, res) {
  connection.query(`
SELECT Name, Price, Neighborhood, City
FROM Airbnb A
 JOIN Listing L ON A.id = L.id
WHERE L.city = '${req.query.city}'
` ,
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
        res.json(data);
    }
  });
}

const get_craigslist = async function(req, res) {
  connection.query(`
SELECT Name, Price, Neighborhood, City
FROM Craigslist C
 JOIN Listing L ON C.id = L.id
WHERE L.city = '${req.query.city}'
` ,
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
        res.json(data);
    }
  });

}


// Route 8: GET /top_rentals/:neighborhood
// This query selects the top 10 rentals in Craigslist/Airbnb with lowest price by day (Craigslist gives monthly prices)
const top_rentals = async function(req, res) {
  connection.query(`
  WITH Ls AS ((SELECT C.Id, Name, Price / 30 AS Price, Neighborhood, City, Year, 'craigslist' AS Type
  FROM Craigslist C
           JOIN Listing L ON C.id = L.id
  WHERE L.city = '${req.query.city}')
 UNION
 (SELECT A.Id, Name, Price, Neighborhood, City, Year, 'airbnb' AS Type
  FROM Airbnb A
           JOIN Listing L ON A.id = L.id
  WHERE L.city = '${req.query.city}'))
SELECT *
FROM Ls
ORDER BY Price
LIMIT 10  
` ,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });

}


// Route 9: GET /common_listings/:email
// For a given user x, this query selects other listings that have been saved by other users who have saved listings in common with x.
const common_listings = async function(req, res) {
  connection.query(`
  WITH diff_users AS (
    SELECT s.email AS s1_email, s.ListingID As lID, s2.email AS s2_email
    FROM Saves s
    JOIN Saves s2 ON s.ListingID = s2.ListingID AND s.email <> s2.email
    ),
    p_diff_users AS (
    SELECT *
    FROM diff_users
    WHERE s1_email = 'user25@example.com'
    ), recommend_listings AS (
    SELECT *
    FROM p_diff_users p
    JOIN Saves s ON p.s2_email = s.email AND p.lID <> s.ListingID
        LIMIT 20
    )
    (SELECT DISTINCT ListingID, l.Name, l.Price, l.Neighborhood, l.City, 'AirBnb' AS ListingType
    FROM recommend_listings rl
    JOIN Airbnb a ON  ListingID = a.Id
    JOIN Listing l ON ListingID = l.Id)
    UNION
    (SELECT DISTINCT ListingID, l.Name, l.Price, l.Neighborhood, l.City, 'AirBnb' AS ListingType
    FROM recommend_listings rl
    JOIN Craigslist c ON  rl.lID = c.Id
    JOIN Listing l ON c.Id = l.Id)
` ,
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
        res.json(data);
      }
    });

}


// Route 10: GET /listings_above_average/:count
// This query retrieves the names and emails of users who have listings priced above the average price of listing in the same city, 
// AND have a total count of listings above a given listing count.
const listings_above_average = async function (req, res) {
  connection.query(`
  WITH UL AS (SELECT S.ListingID, S.email
    FROM Saves S),
Count_df AS (SELECT email, COUNT(*) AS count
          FROM UL
          GROUP BY email
          HAVING COUNT(*) > 1000)
SELECT DISTINCT U.email
FROM (SELECT UL.ListingID, UL.email
FROM UL
       JOIN Count_df c ON c.email = UL.email) U
 JOIN Listing L ON U.ListingID = L.id
WHERE L.price > (SELECT AVG(price)
         FROM Listing L2
         WHERE L2.city = L.city)  
LIMIT(20)  
` ,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });

}

module.exports = {
  user_saves,
  airbnb_in_price_range,
  craigslist_in_price_range,
  listings_per_city,
  average_price,
  top_neighborhoods,
  user_info,
  airbnb_no_craiglist,
  top_rentals,
  common_listings,
  listings_above_average,
  get_airbnb,
  get_craigslist
}
