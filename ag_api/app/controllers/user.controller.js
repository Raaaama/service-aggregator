const User = require("../models/user.model.js");

exports.logIn = (req, res) => {
  const user = new User({
    emadress: req.query.emadress,
    password: req.query.password,
  });

  User.doesExist(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while checking.",
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
  const user = new User({
    emadress: req.body.emadress,
    password: req.body.password,
    username: req.body.username,
    telnum: req.body.telnum,
  });

  // Save Tutorial in the database
  User.addUser(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    else res.send(data);
  });
};
