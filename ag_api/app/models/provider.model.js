const sql = require("./db.js");

// constructor
const Provider = function (provider) {
  this.name = provider.name;
  this.adress = provider.adress;
  this.emadress = provider.emadress;
  this.password = provider.password;
};

Provider.getAll = (id, result) => {
  let query =
    "select a.idprovider, c.idservices, a.name, a.adress, c.price, c.timePerService, b.image_url from providers a, images b, services c where a.idprovider = b.idp and a.idprovider = c.idpro";

  if (id) {
    query += ` and c.idst = ${id}`;
  }

  //only if it has an option with a timetable
  query += ` and a.idprovider in (select distinct d.idpro from timetable a, options b, option_types c, services d, providers e where b.idoption = a.idoption and b.idot = c.idoptiontypes and c.idserv = d.idservices and d.idpro = e.idprovider and d.idst = ${id})`

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

Provider.getOne = ([idp, idst], result) => {
  let query =
    "select a.idprovider, c.idservices, b.idservice_type, a.name, a.adress, c.price, c.timePerService, c.description from providers a, service_types b, services c where a.idprovider = c.idpro and b.idservice_type = c.idst";
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

Provider.getByIdp = (idp, result) => {
  let query = "select * from providers where idprovider = " + idp;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Provider.addProvider = (provider, result) => {
  let query = `insert into providers(name,adress,emadress,password) values ('${provider.name}','${provider.adress}','${provider.emadress}','${provider.password}');`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("added provider: ", { ...provider });
    result(null, { res: "Вы успешно зарегистрировались!" });
  });
};

Provider.checkOne = ([emadress, password], result) => {
  let query =
    'select idprovider from providers where emadress = "' +
    emadress +
    '" and password = "' +
    password +
    '"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Provider.updateProviderInfo = ([name, adress, emadress, idp], result) => {
  let query =
    `update providers set name = "` +
    name +
    `", adress = "` +
    adress +
    `", emadress = "` +
    emadress +
    `" where idprovider = ` +
    idp;

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
