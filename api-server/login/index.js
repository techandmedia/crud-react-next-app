const express = require("express");
const router = express.Router();
const mySQL = require("../config/my-sql");

const query = require("./query");

exports.login = router.post("/api/users/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body);

  let user = null;
  mySQL.query(query.userDetails, [username], function(error, results, fields) {
    console.log(results);
    user = results;
  });

  let preference = null;
  mySQL.query(
    "SELECT * FROM user_preference WHERE user_name = ?",
    [username],
    function(error, results, fields) {
      console.log(results);
      preference = results;
    }
  );

  mySQL.query("SELECT * FROM login WHERE user_name = ?", [username], function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.send({
        code: 400,
        status: "Failed",
        message: "Error ocurred"
      });
    } else {
      if (results.length > 0) {
        if (results[0].password === password) {
          res.send({
            code: 200,
            status: "Success",
            message: "Login sucessfull",
            data: { user, preference }
          });
        } else {
          res.send({
            code: 204,
            status: "Failed",
            message: "Username and Password does not match"
          });
        }
      } else {
        res.send({
          code: 205,
          status: "Failed",
          message: "Username does not exits"
        });
      }
    }
  });
});

module.exports = router;
