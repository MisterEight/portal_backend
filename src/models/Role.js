const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Permissao = require('./Permissao');
const RolePermissao = require('./RolePermissao');

const Role = sequelize.define('Role', {
  role_id: {
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
  tableName: 'roles',
  timestamps: false
});

Role.belongsToMany(Permissao, {
  through: RolePermissao,
  foreignKey: 'role_id',
  otherKey: 'permissao_id'
});

module.exports = Role;

