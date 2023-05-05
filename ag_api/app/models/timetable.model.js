const sql = require("./db.js");

// constructor
const Timetable = function (timetable) {
  this.idtimetable = timetable.idtimetable;
};

Timetable.getTimetable = ([idoption,dayOfTheWeek], result) => {
  let query = "select b.idtimetable, b.startTime, b.endTime, b.dayOfTheWeek from options a, timetable b where a.idoption = b.idoption";

  query += ` and a.idoption = ${idoption}`;
  query += ` and dayOfTheWeek = ${dayOfTheWeek}`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Timetable;
