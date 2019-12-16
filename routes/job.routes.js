module.exports = app => {
    const jobs = require("../controllers/job.controller.js");
  
    // Create a new Job
    app.post("/jobs", jobs.create);
  
    // Retrieve all jobs
    app.get("/jobs", jobs.findAll);
  
    // Retrieve a single Job with JobId
    app.get("/jobs/:jobId", jobs.findOne);
  
    // Update a Job with JobId
    app.put("/jobs/:jobId", jobs.update);
  
    // Delete a Job with JobId
    app.delete("/jobs/:jobId", jobs.delete);
  
    // Create a new Job
    app.delete("/jobs", jobs.deleteAll);
};