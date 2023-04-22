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

module.exports = Option;
