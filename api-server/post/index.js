const express = require("express");
const router = express.Router();
const mySQL = require("../config/my-sql");

exports.register = router.post("/api/users/register", (req, res) => {
  // console.log(req.body);
  const username = req.body.username;

  function addUser() {
    const today = new Date();
    const newUser = {
      user_name: req.body.username,
      user_full_name: req.body.fullname,
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

    const newPreference = {
      user_name: req.body.username,
      /**
       * Default Working Hour Per Day for New User
       */
      working_hour_per_day: 8
    };

    mySQL.query("INSERT INTO users SET ?", newUser, () => {
      res.send({
        code: 200,
        status: "Success",
        message: "New User is successfully added"
      });
    });

    mySQL.query("INSERT INTO login SET ?", newLoginUser);
    mySQL.query("INSERT INTO user_preference SET ?", newPreference);

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
        status: "Failed",
        message: "error ocurred"
      });
    } else {
      if (results.length > 0) {
        if (results[0].user_name === username) {
          res.send({
            code: 205,
            status: "Failed",
            message: "User is already existed"
            // data: results
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

exports.register = router.post("/api/users/change-preference", (req, res) => {
  const username = req.body.username;

  const newPreference = {
    working_hour_per_day: req.body.working_hour_per_day
  };

  mySQL.query(
    "UPDATE user_preference SET ? WHERE user_name = ?",
    [newPreference, username],
    function(error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          status: "Failed",
          message: "error ocurred"
        });
      } else {
        res.send({
          code: 200,
          status: "Success",
          message: "Update Success",
          data: results
        });
      }
    }
  );
});

module.exports = router;
