const compression = require("compression");
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Database MySQL - Training Route
const getRoute = require("./get");
const postRoute = require("./post");
const loginRoute = require("./login");

server.use(cors());
server.use(compression());
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`Listening on port ${port}`));

// New Route
server.use(getRoute);
server.use(postRoute);
server.use(loginRoute);
