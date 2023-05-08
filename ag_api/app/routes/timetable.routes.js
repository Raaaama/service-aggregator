module.exports = app => {
    const Timetable = require("../controllers/timetable.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", Timetable.findTimetable);

    router.post("/", Timetable.add);

    router.post("/delete/", Timetable.delete);
  
    app.use('/api/timetable', router);
  };
  