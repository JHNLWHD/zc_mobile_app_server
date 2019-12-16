// Import express
const express = require('express');
// Import body parser
const bodyParser = require("body-parser");

// Initialize the app
const app = express();

// Setup server port
const port = process.env.PORT || 8080;

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ILoveZamboanga application." });
});

require("./routes/place.routes.js")(app);
require("./routes/job.routes.js")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log("Server is running on port.");
});

