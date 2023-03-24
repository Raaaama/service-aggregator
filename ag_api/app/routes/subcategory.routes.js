module.exports = app => {
    const subcategories = require("../controllers/subcategory.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Categories
    router.get("/", subcategories.findAll);
  
    app.use('/api/subcategories', router);
  };
  