const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuarios');
const Role = require('./Role');

const UsuarioRole = sequelize.define('UsuarioRole', {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Usuario,
      key: 'usuario_id'
    }
  },
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Role,
      key: 'role_id'
    }
  }
}, {
  tableName: 'usuarios_roles',
  timestamps: false
});

UsuarioRole.belongsTo(Usuario, { foreignKey: 'usuario_id' });
UsuarioRole.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = UsuarioRole;
