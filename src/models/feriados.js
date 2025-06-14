const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feriado = sequelize.define('feriados', {
  feriado_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data_feriado: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
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
  tableName: 'feriados',
  timestamps: false
});

module.exports = Feriado;
