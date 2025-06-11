const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RolePermissao = sequelize.define('RolePermissao', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'roles',
      key: 'role_id'
    }
  },
  permissao_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'permissoes',
      key: 'permissao_id'
    }
  }
}, {
  tableName: 'roles_permissoes',
  timestamps: false
});



module.exports = RolePermissao;
