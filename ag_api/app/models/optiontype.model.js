const sql = require("./db.js");

// constructor
const OptionType = function (optiontype) {
  this.id = optiontype.id;
};

OptionType.updateOptionName = ([optionName, idot], result) => {
  let query = `update option_types set optionname = "${optionName}" where idoptiontypes = ${idot}`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = OptionType;
