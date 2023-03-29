const sql = require("./db.js");

// constructor
const Enrollment = function (enrollment) {
  this.id = enrollment.idenrollment;
};

Enrollment.getEnrollments = ([from, to], result) => {
  let query = "select * from enrollments where signUpDate > '" + from + "' and signUpDate < '" + to + "'";
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Enrollment;
