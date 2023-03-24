const sql = require("./db.js");

// constructor
const ServiceType = function (servicetype) {
  this.name = servicetype.name;
};

ServiceType.getAll = (id, result) => {
  let query = "SELECT * FROM service_types";

  if (id) {
    query += ` where idsubc = ${id}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = ServiceType;
