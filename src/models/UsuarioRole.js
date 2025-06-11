const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuarios');
const Role = require('./Role');
const Comprador = require('./Comprador');
const Unidade = require('./Unidade');

const UsuarioRole = sequelize.define('UsuarioRole', {
  usuarios_roles_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'usuario_id'
    }
  },
  role_id: {
    type: DataTypes.INTEGER,
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
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['usuario_id', 'role_id', 'comprador_id', 'unidade_id']
    }
  ]
});


module.exports = UsuarioRole;
