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

// Route 4: GET /average_price
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


// Route 5: GET /top_neighborhoods
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
const user_info = async function(req, res) {
  connection.query(`
  SELECT city, password
  FROM User
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

// Route 6: GET /airbnb_no_craiglist
// This query selects all Airbnb listings in cities without craigslist
const airbnb_no_craiglist = async function(req, res) {
  connection.query(`
  WITH Cl AS ( 
    SELECT C.id, Name, Price, Neighborhood, City, Date 	
    FROM Craigslist C JOIN Listing L ON C.id = L.id
    ), 
    SELECT Name, Price, Neighborhood, City, Date
    FROM Airbnb A  JOIN Listing L ON A.id = L.id
    WHERE NOT EXIST (
      SELECT *
      FROM Cl C
      WHERE L.city = C.city
    )
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


// Route 6: GET /top_rentals/:neighborhood
// This query selects the top 10 rentals in Craigslist/Airbnb with lowest price by day (Craigslist gives monthly prices)
const top_rentals = async function(req, res) {
  connection.query(`
  WITH Ls AS ( 
    (SELECT C.id, Name, Price / 30 AS Price, Neighborhood, City, Date 	
  FROM Craigslist C JOIN Listing L ON C.id = L.id 	
  WHERE L.neighborhood = '${req.params.neighborhood}') 	
  UNION 	
  (SELECT a.id, Name, Price, Neighborhood, City, Date 	
  FROM Airbnb A JOIN Listing L ON A.id = L.id 	
  WHERE L.neighborhood = '${req.params.neighborhood}')
  ), 
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


// Route 6: GET /common_listings/:email
// This query selects the top 10 rentals in Craigslist/Airbnb with lowest price by day (Craigslist gives monthly prices)
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
    WHERE s1_email = '${req.params.email}'
    ), recommend_listings AS (
    SELECT *
    FROM p_diff_users p
    JOIN Saves s ON p.s2_email = s.email AND p.lID <> s.ListingID
    )
    (SELECT ListingID
    FROM recommend_listings rl
    JOIN Airbnb a ON  rl.lID = a.Id
    JOIN Listing l ON a.Id = l.Id)
    UNION
    (SELECT ListingId
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


// Route 6: GET /listings_above_average/:count
// This query retrieves the names and emails of users who have listings priced above the average price of listing in the same city, 
// AND have a total count of listings above a given listing count.
const listings_above_average = async function(req, res) {
  connection.query(`
  WITH UL AS (
    SELECT S.id, U.name, S.email
  FROM User U JOIN Saves S ON U.email = S.email
  ),
  Count_df AS (
  SELECT email, name, COUNT(*) AS count
  FROM UL
  GROUP BY email, name
  HAVING COUNT(*) > ${req.params.count}
  ),
  SELECT DISTINCT U.name, U.email
  FROM (
  SELECT UL.id, UL.name, UL.email
  FROM UL JOIN Count_df c ON c.email = UL.email
  ) U JOIN Listing L ON U.id = L.id
  WHERE L.price > (
    SELECT AVG(price)
    FROM Listings L2
    WHERE L2.city = L.city
  )
  
  
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
  place,
  listing_in_price_range,
  listings_per_city,
  average_price,
  top_neighborhoods,
  user_info,
  airbnb_no_craiglist,
  top_rentals,
  common_listings,
  listings_above_average
}
