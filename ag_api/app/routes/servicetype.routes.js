module.exports = app => {
    const ServiceType = require("../controllers/servicetype.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Categories
    router.get("/", ServiceType.findAll);

    router.get("/new/", ServiceType.findNew);
  
    app.use('/api/servicetypes', router);
  };
  