const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');
const Permissao = require('./Permissao');

const RolePermissao = sequelize.define('RolePermissao', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Role,
      key: 'role_id'
    }
  },
  permissao_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Permissao,
      key: 'permissao_id'
    }
  }
}, {
  tableName: 'roles_permissoes',
  timestamps: false
});

RolePermissao.belongsTo(Role, { foreignKey: 'role_id' });
RolePermissao.belongsTo(Permissao, { foreignKey: 'permissao_id' });

module.exports = RolePermissao;
