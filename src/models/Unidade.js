const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Unidade extends Model {}

Unidade.init({
  unidade_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  comprador_id: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  sigla: DataTypes.STRING,
  telefone: DataTypes.STRING,
  endereco: DataTypes.STRING,
  bairro: DataTypes.STRING,
  cep: DataTypes.STRING,
  uf: DataTypes.CHAR(2),
  cidade: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Unidade',
  tableName: 'unidades',
  timestamps: true,
  createdAt: 'data_criacao',
  updatedAt: 'data_atualizacao'
});

module.exports = Unidade;
