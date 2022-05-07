const bcrypt = require("bcrypt");
const saltRounds = 10;
const usersService = require("../../services/usersService");

module.exports = {
  register(req, res) {
    const { role, email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      const newUser = {
        role,
        email,
        password: hash,
      };

      usersService
        .create(newUser)
        .then((user) => {
          res.status(201).json({
            status: "success",
            data: user,
          });
        })
        .catch((err) => {
          res.status(422).json({
            status: "error",
            message: err.message,
          });
        });
    });
  },
  findAll(req, res) {
    usersService
      .list()
      .then((users) => {
        res.status(200).json({
          status: "success",
          data: users,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "error",
          message: err.message,
        });
      });
  },
  update(req, res) {
    const { role, email, password } = req.body;
    const { id } = req.params;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      const updateUser = {
        role,
        email,
        password: hash,
      };

      usersService
        .update(id, updateUser)
        .then((user) => {
          res.status(200).json({
            status: "success",
            data: user,
          });
        })
        .catch((err) => {
          res.status(422).json({
            status: "error",
            message: err.message,
          });
        });
    });
  },
  delete(req, res) {
    usersService
      .delete(req.params.id)
      .then((user) => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(422).json({
          status: "error",
          message: err.message,
        });
      });
  },
};
