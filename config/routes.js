const express = require("express");
const controllers = require("../app/controllers");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Car management API");
});

module.exports = router;
