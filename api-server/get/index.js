const express = require("express");
const router = express.Router();
const mySQL = require("../config/my-sql");

exports.getHome = router.get("/", (req, res) => {
  mySQL.query("SELECT * from login", (err, results) => {
    if (err) console.log(err);
    console.log("You are inside a home page");
    // res.send(JSON.stringify(results));
    res.send(results);
  });
});

module.exports = router;
