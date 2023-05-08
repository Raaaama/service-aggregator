const sql = require("./db.js");

// constructor
const Option = function (option) {
  this.id = option.id;
};

Option.getByServiceId = (id, result) => {
  let query = "select a.idoptiontypes ,b.idoption, a.optionname, b.opt from option_types a, options b, services c where a.idoptiontypes = b.idot and a.idserv = c.idservices";

  if (id) {
    query += ` and c.idservices = ${id}`;
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

Option.addOption = ([idot, opt], result) => {
  let query = `insert into options(idot, opt) values(${idot},"${opt}")`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Option.deleteOption = (ido, result) => {
  let query = `delete from options where idoption = ${ido}`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Option;
