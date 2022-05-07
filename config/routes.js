const express = require("express");
const controllers = require("../app/controllers");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Car management API");
});

router.route("/api/users/")
  .get(controllers.api.usersController.findAll)
  .post(controllers.api.usersController.register);

router.route("/api/users/:id")
  .put(controllers.api.usersController.update)
  .delete(controllers.api.usersController.delete);

// router.route("/api/admin/register", controllers.api.admin)

module.exports = router;