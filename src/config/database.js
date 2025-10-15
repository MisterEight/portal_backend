require('dotenv').config();
const { Sequelize } = require('sequelize');

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST || 'localhost',
  port: DB_PORT || 3306,
  dialect: DB_DIALECT || 'mysql',
  logging: false
});

module.exports = sequelize;
