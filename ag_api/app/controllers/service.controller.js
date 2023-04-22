const Service = require("../models/service.model");

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