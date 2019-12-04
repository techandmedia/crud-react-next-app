const express = require("express");
const router = express.Router();
const mySQL = require("../config/my-sql");
const query = require("./query");

exports.getHome = router.get("/", (req, res) => {
  mySQL.query("SELECT * from login", (err, results) => {
    if (err) console.log(err);
    console.log("You are inside a home page");
    // res.send(JSON.stringify(results));
    res.send(results);
  });
});

exports.getAllUserTasks = router.post("/api/users/tasks", (req, res) => {
  const ID_GROUP = req.body.id_group;
  const USER_NAME = req.body.user_name;
  console.log(req.body);

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
  const userQuery =
    ID_GROUP === 10001
      ? query.adminWorkList
      : ID_GROUP === 10005
      ? query.managerWorkList
      : query.userWorkList;

  mySQL.query(userQuery, [USER_NAME], function(error, data, fields) {
    res.send({
      code: 200,
      status: "Success",
      message: "Send Data",
      data
    });
  });
});

exports.getUserList = router.post("/api/users/list", (req, res) => {
  const ID_GROUP = req.body.id_group;
  const USER_NAME = req.body.user_name;
  console.log(req.body);

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
  const userQuery =
    ID_GROUP === 10001
      ? query.adminUserList
      : ID_GROUP === 10005
      ? query.managerWorkList
      : query.userWorkList;

  mySQL.query(userQuery, [USER_NAME], function(error, data, fields) {
    res.send({
      code: 200,
      status: "Success",
      message: "Send Data",
      data
    });
  });
});

exports.getDosen = router.post("/api/dosen", (req, res) => {
  mySQL.query(query.dosenList, function(error, results, fields) {
    console.log(results);
    if (error) {
      res.send({
        code: 400,
        status: "Failed",
        message: error
      });
    } else {
      res.send({
        code: 200,
        status: "Success",
        message: "Get Data Success",
        data: results
      });
    }
  });
});

module.exports = router;
