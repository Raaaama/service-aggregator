const sql = require("./db.js");

const Service = function (service) {
  this.id = service.id;
  this.price = service.price;
  this.timePerService = service.timePerService;
  this.description = service.description;
};

Service.getByIdservice = (id, result) => {
  let query = `select * from services where idservices = ` + id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Service.getByIdp = (id, result) => {
  let query =
    "select b.name, a.idservices, a.price, a.timePerService, a.description from services a, service_types b where a.idst = b.idservice_type and idpro = " +
    id;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Service.updateService = (service, result) => {
  let query = `update services set price = '${service.price}', timePerService = '${service.timePerService}', description = '${service.description}' where idservices = '${service.id}';`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Service.addService = ([idst, idp], result) => {
  let query = `insert into services(idst, idpro, price, timePerService) values('${idst}','${idp}',0,0);`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Service.deleteOne = (id, result) => {
  let query = `delete from services where idservices = ` + id

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { res: "Удалено" });
  });
};

module.exports = Service;
