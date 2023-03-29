module.exports = app => {
    const Timetable = require("../controllers/timetable.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", Timetable.findTimetable);
  
    app.use('/api/timetable', router);
  };
  