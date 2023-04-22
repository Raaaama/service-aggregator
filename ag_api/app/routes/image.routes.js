module.exports = app => {
    const Image = require("../controllers/image.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", Image.findAll);

    router.post("/", Image.add);

    router.post("/delete/", Image.delete)
  
    app.use('/api/image', router);
  };
  