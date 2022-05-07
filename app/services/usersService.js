const usersRepository = require("../repositories/usersRepository");

module.exports = {
  create(requestBody) {
    return usersRepository.create(requestBody);
  },
  async list() {
    try {
      const users = await usersRepository.findAll();
      return users;
    } catch (err) {
      throw err;
    }
  },
  get(id) {
    return usersRepository.find(id);
  },
  getByEmail(email){
    return usersRepository.findOne(email);
  },
  update(id, requestBody) {
    return usersRepository.update(id, requestBody);
  },
  delete(id) {
    return usersRepository.delete(id);
  },
};
