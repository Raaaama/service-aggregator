const Timetable = require("../models/timetable.model");

exports.findTimetable = (req, res) => {
  const id = req.query.idoption;
  const day = req.query.dayoftheweek

  Timetable.getTimetable([id,day], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};

exports.add = (req, res) => {
  const id = req.body.ido;
  const startTime = req.body.startTime
  const endTime = req.body.endTime
  const day = req.body.dayoftheweek

  Timetable.addTimetable([id,startTime,endTime,day], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  const id = req.body.id;

  Timetable.deleteTimetable(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};