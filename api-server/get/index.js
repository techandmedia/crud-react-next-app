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
