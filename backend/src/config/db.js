const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_FILE || "./finance.db",
  logging: false
});

const initializeDatabase = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};

module.exports = {
  sequelize,
  initializeDatabase
};
