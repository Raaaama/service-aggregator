const sql = require("./db.js");

// constructor
const Subcategory = function(subcategory) {
  this.name = subcategory.name;
};

Subcategory.getAll = (id, result) => {
  let query = "SELECT * FROM subcategories";
  
  // if (id) {
  //   query += ` WHERE idcat = ${id}`;
  // }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Subcategory;