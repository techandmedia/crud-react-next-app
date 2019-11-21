const express = require("express");
const router = express.Router();
const mySQL = require("../config/my-sql");

exports.login = router.post("/api/users/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body);

  mySQL.query("SELECT * FROM login WHERE username = ?", [username], function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      if (results.length > 0) {
        if (results[0].password === password) {
          res.send({
            code: 200,
            success: "login sucessfull",
            data: JSON.stringify(results)
          });
        } else {
          res.send({
            code: 204,
            success: "username and password does not match"
          });
        }
      } else {
        res.send({
          code: 205,
          success: "username does not exits"
        });
      }
    }
  });
});

module.exports = router;
