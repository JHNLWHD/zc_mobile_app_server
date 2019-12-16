module.exports = app => {
    const places = require("../controllers/place.controller.js");
  
    // Create a new Place
    app.post("/places", places.create);
  
    // Retrieve all places
    app.get("/places", places.findAll);
  
    // Retrieve a single Place with PlaceId
    app.get("/places/:placeId", places.findOne);
  
    // Update a Place with PlaceId
    app.put("/places/:placeId", places.update);
  
    // Delete a Place with PlaceId
    app.delete("/places/:placeId", places.delete);
  
    // Create a new Place
    app.delete("/places", places.deleteAll);
};