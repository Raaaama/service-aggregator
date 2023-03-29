const Enrollment = require("../models/enrollment.model");

exports.findEnrollments = (req, res) => {
  const from = req.query.from + " 00:00:00";
  const to = req.query.to + "  00:00:00"

  Enrollment.getEnrollments([from,to], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};