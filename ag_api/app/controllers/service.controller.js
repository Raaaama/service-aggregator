const Service = require("../models/service.model");

exports.findByIdservice = (req, res) => {
  const id = req.query.id;

  Service.getByIdservice(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};

exports.findByIdp = (req, res) => {
  const id = req.query.idp;

  Service.getByIdp(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Tutorial
  const service = new Service({
    id: req.body.id,
    price: req.body.price,
    timePerService: req.body.timePerService,
    description: req.body.description,
  });

  // Save Tutorial in the database
  Service.updateService(service, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
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

  let idst = req.body.idst
  let idp = req.body.idp

  // Save Tutorial in the database
  Service.addService([idst, idp], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Provider.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let id = req.body.id

  // Save Tutorial in the database
  Service.deleteOne(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Provider.",
      });
    else res.send(data);
  });
};
