const sql = require("./db.js");

const Service = function (service) {
    this.id = service.id;
  };

Service.getByIdp = (id, result) => {
  let query = "select b.name, a.idservices, a.price, a.timePerService, a.description from services a, service_types b where a.idst = b.idservice_type and idpro = " + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Service;
