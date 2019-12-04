const express = require("express");
const router = express.Router();
const mySQL = require("../config/my-sql");
const query = require("../get/query");

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

exports.newTask = router.post("/api/task/new-task", (req, res) => {
  // const body = req.body;
  const today = new Date();
  // console.log(body);

  const newTask = {
    id_group: req.body.id_group,
    user_name: req.body.user_name,
    notes_one: req.body.notes_one,
    notes_two: req.body.notes_two,
    notes_three: req.body.notes_three,
    created: today,
    modified: today
  };

  mySQL.query("INSERT INTO time_table SET ?", newTask, function(
    error,
    results,
    fields
  ) {
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
        message: "Task Added",
        data: results
      });
    }
  });
});

exports.preference = router.post("/api/users/change-preference", (req, res) => {
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

exports.updatetask = router.post("/api/users/update-task", (req, res) => {
  const body = req.body;

  // console.log(body);
  const ID = req.body.indx;
  let tempID =
    req.body.group_name === "admin"
      ? 10001
      : req.body.group_name === "manager"
      ? 10005
      : req.body.group_name === "user" && 10010;

  /**
   * This wont work due to the nature async
   */
  // mySQL.query(
  //   "SELECT * FROM user_group WHERE group_name = ?",
  //   req.body.group_name,
  //   function(err, res) {
  //     tempID = res.id_group;
  //   }
  // );

  // console.log("FIND ID ============", tempID);

  const groupUpdated = {
    id_group: tempID,
    user_name: req.body.user_name,
    notes_one: req.body.notes_one,
    notes_two: req.body.notes_two,
    notes_three: req.body.notes_three
  };

  const updatedUser = {
    user_full_name: req.body.user_full_name,
    user_name: req.body.user_name
  };

  mySQL.query("UPDATE users SET ? WHERE user_name = ?", [
    updatedUser,
    req.body.user_name
  ]);

  mySQL.query(
    "UPDATE time_table SET ? WHERE id_time_table = ?",
    [groupUpdated, ID],
    function(error, results, fields) {
      console.log("UPDATE TASKS =================", results);
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
          message: "Update Success",
          data: results
        });
      }
    }
  );
});

exports.tambahDosen = router.post("/api/dosen/tambah", (req, res) => {
  // console.log(req.body);
  const id_dosen = req.body.id_dosen;

  function addUser() {
    const today = new Date();
    const newUser = {
      id_dosen: req.body.id_dosen,
      nama_dosen: req.body.fullname,
      created: today,
      modified: today
    };

    mySQL.query("INSERT INTO dosen SET ?", newUser, (error, results) => {
      mySQL.query(query.dosenList, (error, results) => {
        console.log(results);
        res.send({
          code: 200,
          status: "Dosen",
          message: "Berhasil menambah Dosen",
          data: results
        });
      });
    });

    return null;
  }

  mySQL.query("SELECT * FROM dosen WHERE id_dosen = ?", [id_dosen], function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.send({
        code: 400,
        status: "Failed",
        message: error
      });
    } else {
      if (results.length > 0) {
        if (results[0].id_dosen === id_dosen) {
          res.send({
            code: 205,
            status: "Failed",
            message: "ID Dosen sudah ada"
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

exports.updateUserGroup = router.post("/api/users/update-group", (req, res) => {
  console.log(req.body);
  const ID = req.body.indx;
  let tempID =
    req.body.group_name.toLowerCase() === "admin"
      ? 10001
      : req.body.group_name.toLowerCase() === "manager"
      ? 10005
      : req.body.group_name.toLowerCase() === "user" && 10010;

  const groupUpdated = {
    id_group: tempID
  };

  // UPDATE `login` SET `id_group` = '10005' WHERE `login`.`id_login` = 5;

  mySQL.query(
    "UPDATE login SET ? WHERE id_login = ?",
    [groupUpdated, ID],
    function(error, results, fields) {
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
          message: "Update Success",
          data: results
        });
      }
    }
  );
});

exports.updatetask = router.post("/api/users/delete-task", (req, res) => {
  const body = req.body;
  const ID = req.body.indx;
  console.log(body, ID);

  mySQL.query("DELETE FROM time_table WHERE id_time_table = ?", ID, function(
    error,
    results,
    fields
  ) {
    console.log("DELETE TASKS =================", results);
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
        message: "Delete Task Succed",
        data: results
      });
    }
  });
});

module.exports = router;
