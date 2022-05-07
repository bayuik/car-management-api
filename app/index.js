const express = require("express");
const bodyParser = require("body-parser");
const router = require("../config/routes");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

module.exports = app;