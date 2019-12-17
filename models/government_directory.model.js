const sql = require("./db.js");

const GovernmentDirectory = function(government_directory) {
    this.name = government_directory.name;
    this.about = government_directory.about;
    this.contact_number = government_directory.contact_number;
    this.email = government_directory.email;
    this.website = government_directory.website;
}

GovernmentDirectory.create = (newGovernmentDirectory, result) => {
    sql.query("INSERT INTO government_directory SET ?", newGovernmentDirectory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          console.log("created Government directory: ", { id: res.insertId, ...newGovernmentDirectory });
          result(null, { id: res.insertId, ...newGovernmentDirectory });
    });
};

GovernmentDirectory.findById = (governmentDirectoryId, result) => {
    sql.query(`SELECT * FROM government_directory WHERE id = ${governmentDirectoryId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found government directory: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Government directory with the id
      result({ kind: "not_found" }, null);
    });
};

GovernmentDirectory.getAll = result => {
    sql.query("SELECT * FROM government_directory", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Government Directories: ", res);
      result(null, res);
    });
};

GovernmentDirectory.updateById = (id, government_directory, result) => {
    sql.query(
      "UPDATE government_directory SET name = ?, about = ?, contact_number = ?, email = ?, website = ? WHERE id = ?",
      [government_directory.name, government_directory.about, government_directory.contact_number,
        government_directory.email, government_directory.website, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Government Directory with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated Job: ", { id: id, ...job });
        result(null, { id: id, ...job });
      }
    );
};

GovernmentDirectory.remove = (id, result) => {
    sql.query("DELETE FROM government_directory WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Government directory with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Government directory with id: ", id);
      result(null, res);
    });
};

GovernmentDirectory.removeAll = result => {
    sql.query("DELETE FROM government_directory", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} Government Directories`);
      result(null, res);
    });
};
  
module.exports = GovernmentDirectory;
