const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ShortlistPro_DB', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
