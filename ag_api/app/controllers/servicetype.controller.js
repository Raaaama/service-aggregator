const ServiceType = require("../models/servicetype.model");


// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const id = req.query.idsubc;

  ServiceType.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};


exports.findNew = (req, res) => {
  const id = req.query.idp;

  ServiceType.getNew(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};