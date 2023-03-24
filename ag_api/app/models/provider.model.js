const sql = require("./db.js");

// constructor
const Provider = function (provider) {
  this.name = servicetype.name;
};

Provider.getAll = (id, result) => {
  let query = "select a.idprovider, c.idservices, a.name, a.adress, c.price, c.timePerService, b.image_url from providers a, images b, services c where a.idprovider = b.idp and a.idprovider = c.idpro";

  if (id) {
    query += ` and c.idst = ${id}`;
  }

  query += ` group by a.idprovider`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Provider.getOne = (id, result) => {
  let query = "select a.idprovider, c.idservices, a.name, a.adress, c.price, c.timePerService from providers a, services c where a.idprovider = c.idpro";

  if (id) {
    query += ` and a.idprovider = ${id}`;
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

module.exports = Provider;
