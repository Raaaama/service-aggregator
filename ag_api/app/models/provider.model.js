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

Provider.getOne = ([idp,idst], result) => {
  let query = "select a.idprovider, c.idservices, b.idservice_type, a.name, a.adress, c.price, c.timePerService, c.description from providers a, service_types b, services c where a.idprovider = c.idpro and b.idservice_type = c.idst";
  query += ` and a.idprovider = ${idp}`;
  query += `  and b.idservice_type = ${idst}`;

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
