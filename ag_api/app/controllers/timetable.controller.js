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