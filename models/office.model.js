const sql = require("./db.js");

const Office = function(office) {
    this.name = office.name;
    this.address = office.address;
    this.email = office.email;
    this.contact_number = office.contact_number
}

Office.create = (newOffice, result)  => {
    sql.query("INSERT INTO office SET ?", newOffice, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          console.log("created office: ", { id: res.insertId, ...newOffice });
          result(null, { id: res.insertId, ...newOffice });
    });
};

Office.findById = (officeId, result) => {
    sql.query(`SELECT * FROM office WHERE id = ${officeId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Office: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Office with the id
      result({ kind: "not_found" }, null);
    });
};

Office.getAll = result => {
    sql.query("SELECT * FROM office", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Offices: ", res);
      result(null, res);
    });
};

Office.updateById = (id, office, result) => {
    sql.query(
      "UPDATE office SET name = ?, email = ?, address = ?, contact_number = ? WHERE id = ?",
      [office.name, office.email, office.address, office.contact_number, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Office with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated Office: ", { id: id, ...office });
        result(null, { id: id, ...job });
      }
    );
};

Office.remove = (id, result) => {
    sql.query("DELETE FROM office WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted Office with id: ", id);
      result(null, res);
    });
};

Office.removeAll = result => {
    sql.query("DELETE FROM office", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} offices`);
      result(null, res);
    });
};
  
module.exports = Office;
