const GovernmentDirectory = require("../models/government_directory.model.js");

// Create and Save a new Government Directory
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Government Directory
    const government_directory = new GovernmentDirectory({
        name: req.body.name,
        about: req.body.about,
        contact_number: req.body.contact_number,
        email: req.body.email,
        website: req.body.website
    });

    // Save Government Directory in the database
    GovernmentDirectory.create(government_directory, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the government directory."
            });
        else res.send(data);
    });
};

// Retrieve all Government Directory from the database.
exports.findAll = (req, res) => {
    GovernmentDirectory.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving government directory."
          });
        else res.send(data);
    });
};

// Find a single Government Directory with a JobId
exports.findOne = (req, res) => {
    GovernmentDirectory.findById(req.params.governmentDirectoryId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Government Directory with id ${req.params.governmentDirectoryId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Government Directory with id " + req.params.governmentDirectoryId
            });
          }
        } else res.send(data);
    });
};

// Update a Government Directory identified by the GovernmentDirectoryId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    GovernmentDirectory.updateById(
    req.params.governmentDirectoryId,
    new GovernmentDirectory(req.body),
    (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Job with id ${req.params.governmentDirectoryId}.`
            });
        } else {
            res.status(500).send({
                message: "Error updating Job with id " + req.params.governmentDirectoryId
            });
        }
        } else res.send(data);
    }
    ); 
};

// Delete a Government Directory with the specified GovernmentDirectoryId in the request
exports.delete = (req, res) => {
    GovernmentDirectory.remove(req.params.governmentDirectoryId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Government Directory with id ${req.params.governmentDirectoryId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Government Directory with id " + req.params.governmentDirectoryId
            });
          }
        } else res.send({ message: `Government Directory was deleted successfully!` });
    });
};

// Delete all Government Directories from the database.
exports.deleteAll = (req, res) => {
    GovernmentDirectory.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all government directories."
          });
        else res.send({ message: `All government directories were deleted successfully!` });
    });
};