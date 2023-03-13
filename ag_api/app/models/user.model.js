const sql = require("./db.js");

const User = function(user) {
    this.emadress = user.emadress;
    this.password = user.password;
    this.username = user.username;
    this.telnum = user.telnum;
};

User.doesExist = (user, result) => {
    let query = `select iduser from users where emadress = '${user.emadress}' and userpassword = '${user.password}' and userrole = 0;`;
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  };

User.addUser = (user, result) => {
  let query = `insert into users(emadress,userpassword,username,telnum) values ('${user.emadress}','${user.password}','${user.username}','${user.telnum}');`

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("added user: ", { ...user });
    result(null, { ...user });
  });
};

module.exports = User;