const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuarios');
const Role = require('./Role');
const Comprador = require('./Comprador');
const Unidade = require('./Unidade');

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
  },
  comprador_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Comprador,
      key: 'comprador_id'
    }
  },
  unidade_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Unidade,
      key: 'unidade_id'
    }
  }
}, {
  tableName: 'usuarios_roles',
  timestamps: false
});

UsuarioRole.belongsTo(Usuario, { foreignKey: 'usuario_id' });
UsuarioRole.belongsTo(Role, { foreignKey: 'role_id' });
UsuarioRole.belongsTo(Comprador, { foreignKey: 'comprador_id' });
UsuarioRole.belongsTo(Unidade, { foreignKey: 'unidade_id' });

module.exports = UsuarioRole;
