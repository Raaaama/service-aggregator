module.exports = app => {
    const Option = require("../controllers/option.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", Option.findByServiceId);
  
    app.use('/api/option', router);
  };
  