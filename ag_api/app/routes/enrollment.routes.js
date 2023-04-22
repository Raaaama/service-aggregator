module.exports = (app) => {
  const Enrollment = require("../controllers/enrollment.controller.js");

  var router = require("express").Router();

  router.get("/", Enrollment.findEnrollments);
  
  router.get("/customer/", Enrollment.findEnrollmentsByIdCus);

  router.get("/provider/", Enrollment.findEnrollmentsByIdp);

  router.post("/", Enrollment.addEnrollment);

  router.put("/", Enrollment.update);

  app.use("/api/enrollments", router);
};
