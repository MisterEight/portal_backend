require('dotenv').config();

const { Sequelize } = require('sequelize');

const {
  DB_NAME,
  DB_USER,
  DB_PORT,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  dialect: DB_DIALECT,
 
});

module.exports = sequelize;
