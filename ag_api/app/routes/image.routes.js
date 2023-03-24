module.exports = app => {
    const Image = require("../controllers/image.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", Image.findAll);
  
    app.use('/api/image', router);
  };
  