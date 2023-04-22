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


Image.addOne = ([idp, url], result) => {
  let query = `insert into images(idp, image_url) values(` + idp + `,"` + url + `")`

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("added image");
    result(null, { res: "Картинка добавлена" });
  });
};

Image.deleteOne = (id, result) => {
  let query = `delete from images where idimage = ` + id

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("deleted image");
    result(null, { res: "Картинка удалена" });
  });
};

module.exports = Image;
