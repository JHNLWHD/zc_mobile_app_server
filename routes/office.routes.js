module.exports = app => {
    const offices = require("../controllers/office.controller.js");
  
    // Create a new Office
    app.post("/offices", offices.create);
  
    // Retrieve all offices
    app.get("/offices", offices.findAll);
  
    // Retrieve a single Office with OfficeId
    app.get("/offices/:OfficeId", offices.findOne);
  
    // Update a Office with OfficeId
    app.put("/offices/:OfficeId", offices.update);
  
    // Delete a Office with OfficeId
    app.delete("/offices/:OfficeId", offices.delete);
  
    // Create a new Office
    app.delete("/offices", offices.deleteAll);
};