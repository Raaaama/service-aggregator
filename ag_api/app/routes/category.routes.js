module.exports = app => {
  const categories = require("../controllers/category.controller.js");

  var router = require("express").Router();

  // Retrieve all Categories
  router.get("/", categories.findAll);
  
  
  // Create a new Category
  router.post("/", categories.create);

  // Update a Category with id
  router.put("/:id", categories.update);

  /*
  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);
  */

  app.use('/api/categories', router);
};
