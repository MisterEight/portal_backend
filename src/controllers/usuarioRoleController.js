const UsuarioRole = require('../models/UsuarioRole');
const Role = require('../models/Role');
const Usuario = require('../models/Usuarios');

exports.list = async (req, res) => {
  try {
    const { id } = req.params; // usuario id
    const userRoles = await UsuarioRole.findAll({
      where: { usuario_id: id },
      include: [{ model: Role, attributes: ['nome'] }]
    });
    res.status(200).json(userRoles);
  } catch (error) {
    console.error('Erro ao listar roles do usuario:', error);
    res.status(500).json({ error: 'Erro ao listar roles' });
  }
};

exports.add = async (req, res) => {
  try {
    const { id } = req.params; // usuario id
    const { role_id, comprador_id, unidade_id } = req.body;
    const usuario = await Usuario.findByPk(id);
    const role = await Role.findByPk(role_id);
    if (!usuario || !role) {
      return res.status(404).json({ error: 'Usuário ou role não encontrado' });
    }
    const mapping = await UsuarioRole.create({
      usuario_id: id,
      role_id,
      comprador_id: comprador_id || null,
      unidade_id: unidade_id || null
    });
    res.status(201).json(mapping);
  } catch (error) {
    console.error('Erro ao adicionar role ao usuario:', error);
    res.status(500).json({ error: 'Erro ao adicionar role' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id, roleId } = req.params;
    const { comprador_id = null, unidade_id = null } = req.query;
    const mapping = await UsuarioRole.findOne({
      where: { usuario_id: id, role_id: roleId, comprador_id, unidade_id }
    });
    if (!mapping) {
      return res.status(404).json({ error: 'Associação não encontrada' });
    }
    await mapping.destroy();
    res.status(200).json({ message: 'Role removida do usuário' });
  } catch (error) {
    console.error('Erro ao remover role do usuario:', error);
    res.status(500).json({ error: 'Erro ao remover role' });
  }
};
