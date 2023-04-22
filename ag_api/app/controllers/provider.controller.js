const Provider = require("../models/provider.model");

exports.findAll = (req, res) => {
  const id = req.query.idst;

  Provider.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  const idp = req.query.idp;
  const idst = req.query.idst;

  Provider.getOne([idp, idst], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    else res.send(data);
  });
};

exports.findByIdp = (req, res) => {
  const idp = req.query.idp;

  Provider.getByIdp(idp, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
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

  // Create a Tutorial
  const provider = new Provider({
    name: req.body.name,
    adress: req.body.adress,
    emadress: req.body.emadress,
    password: req.body.password,
  });

  // Save Tutorial in the database
  Provider.addProvider(provider, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Provider.",
      });
    else res.send(data);
  });
};


exports.check = (req, res) => {
  const emadress = req.query.emadress;
  const password = req.query.password;

  Provider.checkOne([emadress, password], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    else res.send(data);
  });
};

exports.updateInfo = (req, res) => {
  const name = req.body.name
  const adress = req.body.adress 
  const emadress = req.body.emadress
  const idp = req.body.idp

  Provider.updateProviderInfo([name, adress, emadress, idp], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};