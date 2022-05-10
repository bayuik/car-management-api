const express = require("express");
const path = require("path");
const controllers = require("../app/controllers");
const authController = controllers.api.authController;
const usersController = controllers.api.usersController;
const carsController = controllers.api.carsController;
const router = express.Router();

router.post("/api/register/member", usersController.register);
router.post("/api/register/admin",authController.authorize, usersController.registerAdmin);
router.post("/api/login", authController.login);

router.route("/api/users/:id")
  .put(usersController.update)
  .delete(usersController.deleteUser);

router.get("/api/user", authController.authorize, usersController.getCurrentUser);

router.get("/api/cars/available", carsController.getAvailableCars);
router.route("/api/cars")
  .get(authController.authorize,carsController.getCars)
  .post(authController.authorize,carsController.createCar);

router.route("/api/cars/:id")
  .put(authController.authorize, carsController.updateCar)
  .delete(authController.authorize, carsController.deleteCar)

router.get("/api/api-json", (req, res) => {
  res.sendFile(path.join(__dirname, "../swagger.json"));
})

router.get("/api/api-yaml", (req, res) => {
  res.sendFile(path.join(__dirname, "../swagger.yaml"));
})

module.exports = router;