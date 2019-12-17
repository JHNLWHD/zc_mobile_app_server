module.exports = app => {
    const government_directories = require("../controllers/government_directory.controller.js");
  
    // Create a new Government Directory
    app.post("/government_directories", government_directories.create);
  
    // Retrieve all government_directories
    app.get("/government_directories", government_directories.findAll);
  
    // Retrieve a single Government Directory with GovernmentDirectoryId
    app.get("/government_directories/:governmentDirectoryId", government_directories.findOne);
  
    // Update a Government Directory with GovernmentDirectoryId
    app.put("/government_directories/:governmentDirectoryId", government_directories.update);
  
    // Delete a Government Directory with GovernmentDirectoryId
    app.delete("/government_directories/:governmentDirectoryId", government_directories.delete);
  
    // Create a new Government Directory
    app.delete("/government_directories", government_directories.deleteAll);
};