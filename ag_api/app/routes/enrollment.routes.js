module.exports = (app) => {
  const Enrollment = require("../controllers/enrollment.controller.js");

  var router = require("express").Router();

  router.get("/", Enrollment.findEnrollments);
  
  router.get("/customer/", Enrollment.findEnrollmentsByIdCus);

  router.post("/", Enrollment.addEnrollment);

  app.use("/api/enrollments", router);
};
