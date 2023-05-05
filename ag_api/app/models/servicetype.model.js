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

ServiceType.getNew = (id, result) => {
  let query = "select * from service_types where idservice_type not in (select b.idservice_type from services a, service_types b where a.idst = b.idservice_type and a.idpro = ";

  query += `${id})`;

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
