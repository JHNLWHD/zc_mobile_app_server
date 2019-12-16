const sql = require("./db.js");

const Place = function(place) {
    this.name = place.name;
    this.category = place.category;
    this.address = place.address;
    this.contact_number = place.contact_number;
    this.email = place.email;
    this.serves_pork = place.serves_pork;
    this.is_halal = place.is_halal;
}

Place.create = (newPlace, result) => {
    sql.query("INSERT INTO place SET ?", newPlace, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          console.log("created place: ", { id: res.insertId, ...newPlace });
          result(null, { id: res.insertId, ...newPlace });
    });
};

Place.findById = (placeId, result) => {
    sql.query(`SELECT * FROM place WHERE id = ${placeId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found place: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Place with the id
      result({ kind: "not_found" }, null);
    });
};

Place.getAll = result => {
    sql.query("SELECT * FROM place", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("places: ", res);
      result(null, res);
    });
};

Place.updateById = (id, place, result) => {
    sql.query(
      "UPDATE place SET name = ?, category = ?, address = ?, contactNumber = ?, email = ?, serves_pork = ?, is_halal =? WHERE id = ?",
      [place.name, place.category, place.address, place.contactNumber, place.email, place.serves_pork, place.is_halal, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Place with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated place: ", { id: id, ...place });
        result(null, { id: id, ...place });
      }
    );
};

Place.remove = (id, result) => {
    sql.query("DELETE FROM place WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Place with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted place with id: ", id);
      result(null, res);
    });
};

Place.removeAll = result => {
    sql.query("DELETE FROM place", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} places`);
      result(null, res);
    });
};
  
module.exports = Place;