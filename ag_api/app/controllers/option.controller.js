const Option = require("../models/option.model");

exports.findByServiceId = (req, res) => {
  const id = req.query.idservices;

  Option.getByServiceId(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};