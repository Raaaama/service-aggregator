module.exports = app => {
    const Enrollment = require("../controllers/enrollment.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", Enrollment.findEnrollments);
  
    app.use('/api/enrollments', router);
  };
  