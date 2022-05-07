const { Users } = require("../models");

module.exports = {
  create(value) {
    return Users.create(value);
  },
  findAll() {
    return Users.findAll();
  },
  find(id) {
    return Users.findByPk(id);
  },
  update(id, value) {
    return Users.update(value, {
      where: {
        id,
      },
    });
  },
  delete(id) {
    return Users.destroy({
      where: {
        id,
      }
    });
  },
};
