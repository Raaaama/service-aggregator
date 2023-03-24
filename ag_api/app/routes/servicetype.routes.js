module.exports = app => {
    const ServiceType = require("../controllers/servicetype.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Categories
    router.get("/", ServiceType.findAll);
  
    app.use('/api/servicetypes', router);
  };
  