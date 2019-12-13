// Import express
const express = require('express');
// Import body parser
const bodyParser = require("body-parser");

// Initialize the app
const app = express();

// Setup server port
const port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send({ message: "Welcome to ILoveZamboanga application." }));

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running api on port " + port);
});

// Import routes
let routes = require("./routes")

// Use Api routes in the App
app.use('/api', routes)