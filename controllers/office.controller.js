const Office = require("../models/office.model.js");

// Create and Save a new office
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Office
    const office = new Office({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        contact_number: req.body.contact_number
    });

    // Save Office in the database
    Office.create(office, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the offices."
            });
        else res.send(data);
    });
};

// Retrieve all Office from the database.
exports.findAll = (req, res) => {
    Office.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving offices."
          });
        else res.send(data);
    });
};

// Find a single Office with a OfficeId
exports.findOne = (req, res) => {
    Office.findById(req.params.officeId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Job with id ${req.params.officeId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Job with id " + req.params.officeId
            });
          }
        } else res.send(data);
    });
};

// Update a Office identified by the JobId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Office.updateById(
    req.params.officeId,
    new Office(req.body),
    (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Job with id ${req.params.officeId}.`
            });
        } else {
            res.status(500).send({
                message: "Error updating Job with id " + req.params.officeId
            });
        }
        } else res.send(data);
    }
    ); 
};

// Delete a Job with the specified OfficeId in the request
exports.delete = (req, res) => {
    Office.remove(req.params.officeId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found office with id ${req.params.officeId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete office with id " + req.params.officeId
            });
          }
        } else res.send({ message: `Office was deleted successfully!` });
    });
};

// Delete all Offices from the database.
exports.deleteAll = (req, res) => {
    Office.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all offices."
          });
        else res.send({ message: `All offices were deleted successfully!` });
    });
};