const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// Our 10 routes
//   place,
//   listing_in_price_range,
//   listings_per_city,
//   average_price,
//   top_neighborhoods,
//   user_info,
//   airbnb_no_craiglist,
//   top_rentals,
//   common_listings,
//   listings_above_average




// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.get('/user_saves/:email', routes.user_saves);
app.get('/listing_in_price_range/:price', routes.listing_in_price_range);
app.get('/listings_per_city/', routes.listings_per_city);
app.get('/average_price/:neighborhood', routes.average_price);
app.get('/top_neighborhoods/:city', routes.top_neighborhoods);
app.get('/user_info/:email', routes.user_info);
app.get('/airbnb_no_craiglist', routes.airbnb_no_craiglist);
app.get('/top_rentals/:neighborhood', routes.top_rentals);
app.get('/common_listings/:email', routes.common_listings);
app.get('/listings_above_average/:count', routes.listings_above_average);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});
module.exports = app;