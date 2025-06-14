const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Licitacao = sequelize.define('Licitacao', {
  licitacao_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comprador_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pregoeiro_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ordenador_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  natureza: {
    type: DataTypes.ENUM('Produto', 'Serviço'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('RASCUNHO', 'PUBLICADA', 'CANCELADA'),
    defaultValue: 'RASCUNHO'
  },
  data_publicacao: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ativa: {
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
  tableName: 'licitacoes',
  timestamps: false
});

module.exports = Licitacao;
