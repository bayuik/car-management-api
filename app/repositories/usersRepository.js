const { Users } = require("../models");

const create = (value) => Users.create(value);
const findAll = () => Users.findAll();
const find = (id) => Users.findByPk(id);
const findOne = (email) => Users.findOne({ where: { email } });
const update = (id, value) => Users.update(value, { where: { id } });
const deleteUser = (id) => Users.destroy({ where: { id } });

module.exports = {
  create,
  findAll,
  find,
  findOne,
  update,
  deleteUser,
};