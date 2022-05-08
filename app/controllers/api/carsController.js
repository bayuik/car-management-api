const service = require("../../services/carsService");

const checkUser = (user) => {
  let message;
  if (user == "superadmin" || user == "admin") {
    message = {
      status: true,
      message: "You are authorized to access this resource",
    };
  } else {
    message = {
      status: false,
      message: "You are not authorized to access this resource",
    };
  }
  return message;
};

const createCar = async (req, res) => {
  const { name, price, size, available = true } = req.body;
  const { role, email } = req.user;
  const checkedUser = await checkUser(role);
  if (!checkedUser.status) return res.status(401).json(checkedUser);
  const newCar = {
    name,
    price,
    size,
    available,
    createdBy: email,
  };
  service.create(newCar)
  .then((car) => {
    res.status(201).json({
      status: "success",
      data: car,
    });
  })
  .catch(err => {
    res.status(422).json({
      status: "error",
      message: err.message,
    });
  })
};

const getCars = (req, res) => {
  service
    .list()
    .then((cars) => {
      res.status(200).json({
        status: "success",
        data: cars,
      });
    })
    .catch((err) => {
      res.status(422).json({
        status: "error",
        message: err.message,
      });
    });
};

const getAvailableCars = (req, res) => {
  service
    .availableCars()
    .then((cars) => {
      res.status(200).json({
        status: "success",
        data: cars,
      });
    })
    .catch((err) => {
      res.status(422).json({
        status: "error",
        message: err.message,
      });
    });
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { name, price, size, available } = req.body;
  const { role, email } = req.user;
  const checkedUser = await checkUser(role);
  if (!checkedUser.status) return res.status(401).json(checkedUser);
  const updateCar = {
    name,
    price,
    size,
    available,
    updatedBy: email,
  };
  service
    .update(id, updateCar)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Car updated successfully",
      });
    })
    .catch((err) => {
      res.status(422).json({
        status: "error",
        message: err.message,
      });
    });
};

const deleteCar = (req, res) => {
  const { id } = req.params;
  service
    .deleteCars(id)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Car deleted successfully",
      });
    })
    .catch((err) => {
      res.status(422).json({
        status: "error",
        message: err.message,
      });
    });
};

module.exports = {
  createCar,
  getCars,
  getAvailableCars,
  updateCar,
  deleteCar,
};
