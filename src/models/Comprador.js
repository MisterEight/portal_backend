const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comprador = sequelize.define('Comprador', {
    comprador_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O nome não pode estar vazio'
          }
        }
      },
      erp_utilizado: {
        type: DataTypes.STRING,
        allowNull: true
      },
      possui_power_bi: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      data_atualizacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
}, {
  tableName: 'compradores',
  timestamps: false
});

module.exports = Comprador;

