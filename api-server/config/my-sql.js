const mysql = require("mysql");

const connectionMySQL = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  port: "3307",
  user: "root",
  password: "123",
  database: "training",
});

module.exports = connectionMySQL;
