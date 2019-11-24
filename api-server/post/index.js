const express = require("express");
const router = express.Router();
const mySQL = require("../config/my-sql");

exports.register = router.post("/api/users/register", (req, res) => {
  // console.log(req.body);
  const username = req.body.username;

  // For later use
  // Update Current User
  // UPDATE `users` SET `username` = 'adi.sopian@subarnanto.com' WHERE `users`.`id_user` = 3;

  function addUser() {
    const today = new Date();
    const newUser = {
      user_name: req.body.username,
      user_full_name: req.body.fullName,
      user_address: req.body.address,
      user_phone_number: req.body.phone,
      // Insert current time
      // CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      created: today,
      modified: today
    };

    const newLoginUser = {
      user_name: req.body.username,
      password: req.body.password,
      created: today,
      modified: today
    };
    // console.log(newUser)
    mySQL.query("INSERT INTO users SET ?", newUser, (err, results, fields) => {
      mySQL.query(
        "INSERT INTO login SET ?",
        newLoginUser,
        (err, results, fields) => {
          res.send({
            code: 200,
            status: "Success",
            message: "New User is successfully added"
          });
        }
      );
    });

    return null;
  }

  mySQL.query("SELECT * FROM users WHERE user_name = ?", [username], function(
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
        if (results[0].user_name === username) {
          res.send({
            code: 205,
            success: "User is already existed",
            data: results
          });
        }
      } else {
        /**
         * if results.length === 0
         * add user
         */

        addUser();
      }
    }
  });
});

module.exports = router;
