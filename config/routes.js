const express = require("express");
const controllers = require("../app/controllers");
const authController = controllers.api.authController;
const usersController = controllers.api.usersController;
const carsController = controllers.api.carsController;
const router = express.Router();

router.post("/api/register/member", usersController.register);
router.post("/api/register/admin",authController.authorize, usersController.registerAdmin);
router.post("/api/login", authController.login);

router.get("/api/users", usersController.getUsers);
router.route("/api/users/:id")
  .get(usersController.getUser)
  .put(usersController.update)
  .delete(usersController.deleteUser);

router.route("/api/cars")
  .get(authController.authorize,carsController.getCars)
  .post(authController.authorize,carsController.createCar);

router.get("/api/cars/available", carsController.getAvailableCars);

router.route("/api/cars/:id")
  .put(authController.authorize, carsController.updateCar)
  .delete(authController.authorize, carsController.deleteCar)

module.exports = router;