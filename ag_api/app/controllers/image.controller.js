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

exports.add = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let idp = req.body.idp;
  let url = req.body.url;

  Image.addOne([idp, url], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Provider.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  console.log(req.body.id)
  Image.deleteOne(req.body.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Provider.",
      });
    else res.send(data);
  });
};