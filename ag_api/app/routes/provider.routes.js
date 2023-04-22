module.exports = app => {
    const Provider = require("../controllers/provider.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all
    router.get("/", Provider.findAll);

    // Retrieve one
    router.get("/findOne/", Provider.findOne);

    // retrieve by idp
    router.get("/byidp/", Provider.findByIdp)

    //check
    router.get("/check/", Provider.check);

    //add
    router.post("/", Provider.add);

    router.put("/", Provider.updateInfo);
  
    app.use('/api/providers', router);
  };
  