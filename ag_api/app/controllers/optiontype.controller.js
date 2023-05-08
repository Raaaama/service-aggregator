const OptionType = require("../models/optiontype.model");

exports.update = (req, res) => {
  const optionName = req.body.name;
  const idot = req.body.idot;

  OptionType.updateOptionName([optionName, idot], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    else res.send(data);
  });
};
