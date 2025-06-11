const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');
const RolePermissao = require('./RolePermissao');

const Permissao = sequelize.define('Permissao', {
  permissao_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'permissoes',
  timestamps: false
});

Permissao.belongsToMany(Role, {
  through: RolePermissao,
  foreignKey: 'permissao_id',
  otherKey: 'role_id'
});

module.exports = Permissao;

