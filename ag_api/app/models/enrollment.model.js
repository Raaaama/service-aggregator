const sql = require("./db.js");

// constructor
const Enrollment = function (enrollment) {
  this.id = enrollment.idenrollment;
};

Enrollment.getEnrollmentsByIdp = (idp, result) => {
  let query = 'select g.name, f.idservices, a.idenrollment, b.iduser, b.username, b.telnum, d.optionname, c.idoption, c.opt, a.signUpDate, a.approved from enrollments a, users b, options c, option_types d, providers e, services f, service_types g where f.idpro = e.idprovider and f.idservices = d.idserv and a.idcus = b.iduser and a.idop = c.idoption and c.idot = d.idoptiontypes and f.idst = g.idservice_type';
  
  query += ' and e.idprovider = ' + idp

  query += ' order by a.signUpDate desc'

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
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

Enrollment.updateEnrollment = ([status, id], result) => {
  let query = 'update enrollments set approved = ' + status + ' where idenrollment = ' + id
  
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
