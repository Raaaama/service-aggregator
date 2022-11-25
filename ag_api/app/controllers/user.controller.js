const User = require("../models/user.model.js");

exports.logIn = (req, res) => {
  
    const user = new User({
        emadress: req.query.emadress,
        password: req.query.password
      });

    User.doesExist(user, (err, data) => {
    if (err)
        res.status(500).send({
        message:
            err.message || "Some error occurred while checking."
        });
    else res.send(data);
    });
};
  