const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Documento = sequelize.define('Documento', {
  documento_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  grupo_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  caminho_arquivo: {
    type: DataTypes.STRING
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
  tableName: 'documentos',
  timestamps: false
});

module.exports = Documento;
