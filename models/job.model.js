const sql = require("./db.js");

const Job = function(job) {
    this.company_name = job.company_name;
    this.company_email = job.company_email;
    this.hiring_details = job.hiring_details;
}

Job.create = (newJob, result) => {
    sql.query("INSERT INTO job SET ?", newJob, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          console.log("created Job: ", { id: res.insertId, ...newJob });
          result(null, { id: res.insertId, ...newJob });
    });
};

Job.findById = (jobId, result) => {
    sql.query(`SELECT * FROM job WHERE id = ${jobId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Job: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Job with the id
      result({ kind: "not_found" }, null);
    });
};

Job.getAll = result => {
    sql.query("SELECT * FROM job", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Jobs: ", res);
      result(null, res);
    });
};

Job.updateById = (id, job, result) => {
    sql.query(
      "UPDATE job SET company_name = ?, company_email = ?, hiring_details = ? WHERE id = ?",
      [job.company_name, job.company_email, job.hiring_details, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Job with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated Job: ", { id: id, ...job });
        result(null, { id: id, ...job });
      }
    );
};

Job.remove = (id, result) => {
    sql.query("DELETE FROM job WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Job with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Job with id: ", id);
      result(null, res);
    });
};

Job.removeAll = result => {
    sql.query("DELETE FROM job", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} Jobs`);
      result(null, res);
    });
};
  
module.exports = Job;
