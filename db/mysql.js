const mysql = require("mysql");
const { MYSQL_CONF } = require("../config/db");

const con = mysql.createConnection(MYSQL_CONF);

con.connect();

function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      if (data) resolve(data);
    });
  });
  return promise;
}

module.exports = {
  exec,
  escape: mysql.escape,
};
