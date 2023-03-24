module.exports = app => {
    const Provider = require("../controllers/provider.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all
    router.get("/", Provider.findAll);

    // Retrieve one
    router.get("/findOne/", Provider.findOne);
  
    app.use('/api/providers', router);
  };
  