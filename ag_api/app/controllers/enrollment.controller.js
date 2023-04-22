const Enrollment = require("../models/enrollment.model");



exports.findEnrollments = (req, res) => {
  const from = req.query.from + " 00:00:00";
  const to = req.query.to + "  00:00:00";
  const idop = req.query.idop;

  Enrollment.getEnrollments([from, to, idop], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};

exports.findEnrollmentsByIdCus = (req, res) => {
  const idcus = req.query.idcus

  Enrollment.getEnrollmentsByIdcus(idcus, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};

exports.findEnrollmentsByIdp = (req, res) => {
  const idp = req.query.idp

  Enrollment.getEnrollmentsByIdp(idp, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};


exports.addEnrollment = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const id = req.body.id;
  const datetime = req.body.datetime;
  const optionpicked = req.body.optionpicked;

  Enrollment.addEnrollment([id, datetime, optionpicked], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred"
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  const id = req.body.id
  const status = req.body.status

  Enrollment.updateEnrollment([status, id], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};