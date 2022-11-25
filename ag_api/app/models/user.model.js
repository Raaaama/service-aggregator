const sql = require("./db.js");

const User = function(user) {
    this.emadress = user.emadress;
    this.password = user.password;
};

User.doesExist = (user, result) => {
    let query = `select count(username) from users where emadress = '${user.emadress}' and userpassword = '${user.password}';`;
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  };

module.exports = User;