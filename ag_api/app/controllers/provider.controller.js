const Provider = require("../models/provider.model");

exports.findAll = (req, res) => {
  const id = req.query.idst;

  Provider.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  const id = req.query.idst;

  Provider.getOne(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};
