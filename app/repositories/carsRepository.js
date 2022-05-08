const { Cars } = require("../models");

const create = (value) => Cars.create(value);
const findAll = () => Cars.findAll();
const find = (id) => Cars.find(id);
const findAvailableCars = () => Cars.findAll({where: {available: true}});
const update = (id, value) => Cars.update(value, { where: { id } });
const deleteCars = (id) => Cars.destroy({ where: { id } });

module.exports = {
  create,
  findAll,
  find,
  findAvailableCars,
  update,
  deleteCars,
};
