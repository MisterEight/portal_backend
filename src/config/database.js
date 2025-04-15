const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pcp', 'root', 'senha', { //senha com base no banco de dados do seu computador
  host: 'localhost',
  dialect: 'mysql', // ou 'postgres'
});

module.exports = sequelize;