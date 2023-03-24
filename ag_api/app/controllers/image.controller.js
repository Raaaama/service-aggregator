const Image = require("../models/image.model");

exports.findAll = (req, res) => {
  const id = req.query.idp;

  Image.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};