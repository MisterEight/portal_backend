const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const db = {};

// Models
db.Role = require('./Role');
db.Permissao = require('./Permissao');
db.RolePermissao = require('./RolePermissao');
db.UsuarioRole = require('./UsuarioRole');
db.Usuario = require('./Usuarios');
db.Comprador = require('./Comprador');
db.Unidade = require('./Unidade');
db.Documento = require('./Documento');

// Associations
// roles <-> permissoes
db.Role.belongsToMany(db.Permissao, {
  through: db.RolePermissao,
  foreignKey: 'role_id',
  otherKey: 'permissao_id'
});

db.Permissao.belongsToMany(db.Role, {
  through: db.RolePermissao,
  foreignKey: 'permissao_id',
  otherKey: 'role_id'
});

db.RolePermissao.belongsTo(db.Role, { foreignKey: 'role_id' });
db.RolePermissao.belongsTo(db.Permissao, { foreignKey: 'permissao_id' });

db.UsuarioRole.belongsTo(db.Usuario, { foreignKey: 'usuario_id' });
db.UsuarioRole.belongsTo(db.Role, { foreignKey: 'role_id' });
db.UsuarioRole.belongsTo(db.Comprador, { foreignKey: 'comprador_id' });
db.UsuarioRole.belongsTo(db.Unidade, { foreignKey: 'unidade_id' });

module.exports = { sequelize, Sequelize, ...db };
