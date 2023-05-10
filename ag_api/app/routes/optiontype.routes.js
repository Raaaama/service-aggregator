module.exports = app => {
    const OptionType = require("../controllers/optiontype.controller");
  
    var router = require("express").Router();
  
    router.put("/", OptionType.update);

    router.post("/", OptionType.add);

    app.use('/api/optiontype', router);
  };
  