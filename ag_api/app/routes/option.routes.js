module.exports = app => {
    const Option = require("../controllers/option.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", Option.findByServiceId);

    router.post("/", Option.add);

    router.post("/delete/", Option.delete);
  
    app.use('/api/option', router);
  };
  