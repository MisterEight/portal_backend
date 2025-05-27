const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuarios = sequelize.define('Usuarios', {
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      senha_hash: {
        type: DataTypes.STRING,
        allowNull: false
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
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuarios;