const express = require("express");
const controllers = require("../app/controllers");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Car management API");
});

router.route("/api/members/")
  .get(controllers.api.usersController.findAll)
  .post(controllers.api.authController.register);

router.route("/api/members/:id")
  .put(controllers.api.usersController.update)
  .delete(controllers.api.usersController.delete);

router.route("/api/admin/")
  .post(controllers.api.authController.authorize,
    controllers.api.authController.registerAdmin);

router.route("/api/login")
  .post(controllers.api.authController.login);

module.exports = router;