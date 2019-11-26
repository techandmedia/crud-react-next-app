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
    // console.log(results);
    user = results;
  });

  /**
   * This puts here to avoid race condition due the nature of async
   */
  let preference = null;
  mySQL.query(
    "SELECT * FROM user_preference WHERE user_name = ?",
    [username],
    function(error, results, fields) {
      // console.log(results);
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
          if (user.length > 0) {
            /**
             * If a User Group of Admin Logged in, send all users
             * ID Group = 10001
             * ==================
             * If a User Group of Manager Logged in, send all users but Admin
             * ID Group = 10005
             * ==================
             * If a User Group of User Logged in, send his/her own records
             * ID Group = 10010
             */

            const ID = results[0].id_group;
            const userQuery =
              ID === 10001
                ? query.adminWorkList
                : ID === 10005
                ? query.managerWorkList
                : query.userWorkList;

            mySQL.query(userQuery, [username], function(error, data, fields) {
              res.send({
                code: 200,
                status: "Success",
                message: "Login sucessfull",
                data: { user, preference, data }
              });
            });
          } else {
            /**
             * If a User is not yet activated, do no let them log in
             */
            res.send({
              code: 201,
              status: "Success",
              message: "Your Profile is not activated, please contact Admin!"
            });
          }
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
