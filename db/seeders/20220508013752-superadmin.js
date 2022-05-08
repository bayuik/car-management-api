"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          role: "superadmin",
          email: "admin@email.com",
          password: "$2b$10$ZmTqn4xdYMOovRiRwhoMUuRbPWspNX2QzT9sq37zvnIlMY.Zd6vBG",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
