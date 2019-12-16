const Place = require("../models/place.model.js");

// Create and Save a new Places
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Place
    const place = new Place({
        name: req.body.name,
        category: req.body.category,
        address: req.body.address,
        contact_number:  req.body.contact_number,
        email: req.body.email,
        serves_pork: req.body.serves_pork,
        is_halal: req.body.is_halal
    });

    // Save Place in the database
    Place.create(place, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Places."
            });
        else res.send(data);
    });
};

// Retrieve all Placess from the database.
exports.findAll = (req, res) => {
    Place.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving places."
          });
        else res.send(data);
      });
};

// Find a single Places with a PlacesId
exports.findOne = (req, res) => {
    Place.findById(req.params.placeId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Place with id ${req.params.placeId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Place with id " + req.params.placeId
            });
          }
        } else res.send(data);
    });
};

// Update a Places identified by the PlacesId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    Place.updateById(
    req.params.placeId,
    new Place(req.body),
    (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Place with id ${req.params.placeId}.`
            });
        } else {
            res.status(500).send({
              message: "Error updating Place with id " + req.params.placeId
            });
        }
        } else res.send(data);
    }
    ); 
};

// Delete a Places with the specified PlacesId in the request
exports.delete = (req, res) => {
    Place.remove(req.params.placeId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Place with id ${req.params.placeId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Place with id " + req.params.placeId
            });
          }
        } else res.send({ message: `Place was deleted successfully!` });
    });
};

// Delete all Placess from the database.
exports.deleteAll = (req, res) => {
    Place.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all places."
          });
        else res.send({ message: `All places were deleted successfully!` });
    });
};