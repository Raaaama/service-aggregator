const sql = require("./db.js");

// constructor
const Image = function (image) {
  this.url = image.url;
};

Image.getAll = (id, result) => {
  let query = "select * from images";

  if (id) {
    query += ` where idp = ${id}`;
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

module.exports = Image;
