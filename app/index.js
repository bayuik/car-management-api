const express = require("express");
const bodyParser = require("body-parser");
const router = require("../config/routes");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const swaggerDocument = yaml.load(fs.readFileSync("swagger.yaml", "utf8"));
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(router);

module.exports = app;
