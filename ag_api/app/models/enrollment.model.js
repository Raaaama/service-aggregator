const sql = require("./db.js");

// constructor
const Enrollment = function (enrollment) {
  this.id = enrollment.idenrollment;
};

Enrollment.getEnrollments = ([from, to, idop], result) => {
  let query = "select * from enrollments where signUpDate > '" + from + "' and signUpDate < '" + to + "' and idop = " + idop;
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Enrollment.getEnrollmentsByIdcus = (idcus, result) => {
  let query = "select a.idenrollment, c.optionname, b.opt, a.signUpDate, a.approved, e.name as 'serviceTypeName', f.name as 'providerName', f.adress from enrollments a, options b, option_types c, services d, service_types e, providers f where idop = idoption and b.idot = c.idoptiontypes and c.idserv = d.idservices and e.idservice_type = d.idst and d.idpro = f.idprovider and idcus = " + idcus + " ORDER BY signUpDate";
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Enrollment.addEnrollment = ([id, datetime, optionpicked], result) => {
  let query = 'insert into enrollments(idcus, idop, signUpDate) values(' + id + ',' + optionpicked + ',"' + datetime + '")'
  
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
