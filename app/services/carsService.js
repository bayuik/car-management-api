const repository = require("../repositories/carsRepository");

const create = (value) => repository.create(value);
const list = async () => {
  try {
    const cars = await repository.findAll();
    return cars;
  } catch (err) {
    throw err;
  }
};
const get = (id) => repository.find(id);
const availableCars = async (key, value) => {
  try {
    const cars = await repository.findAvailableCars();
    return cars;
  } catch (err) {
    throw err;
  }
};
const update = (id, value) => repository.update(id, value);
const deleteCars = (id) => repository.deleteCars(id);

module.exports = {
  create,
  list,
  get,
  availableCars,
  update,
  deleteCars,
};
