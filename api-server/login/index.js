const express = require("express");
const router = express.Router();
const mySQL = require("../config/my-sql");

exports.login = router.post("/api/users/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body);

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
            data: results
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
