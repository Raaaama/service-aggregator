const Subcategory = require("../models/subcategory.model.js");


// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const id = req.query.idcat;

  Subcategory.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};
