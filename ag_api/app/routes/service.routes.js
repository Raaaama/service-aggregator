module.exports = app => {
    const Service = require("../controllers/service.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", Service.findByIdp);
  
    app.use('/api/service', router);
  };
  