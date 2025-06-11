const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuarios');
const Unidade = require('./Unidade');
const Permissao = require('./Permissao');

const UsuarioUnidadePermissao = sequelize.define('UsuarioUnidadePermissao', {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Usuario,
      key: 'usuario_id'
    }
  },
  unidade_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Unidade,
      key: 'unidade_id'
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
  tableName: 'usuarios_unidades_permissoes',
  timestamps: false
});

UsuarioUnidadePermissao.belongsTo(Usuario, { foreignKey: 'usuario_id' });
UsuarioUnidadePermissao.belongsTo(Unidade, { foreignKey: 'unidade_id' });
UsuarioUnidadePermissao.belongsTo(Permissao, { foreignKey: 'permissao_id' });

module.exports = UsuarioUnidadePermissao;

