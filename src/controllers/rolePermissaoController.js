const Role = require('../models/Role');
const Permissao = require('../models/Permissao');
const RolePermissao = require('../models/RolePermissao');

exports.list = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      include: [{ model: Permissao, through: { attributes: [] } }]
    });
    if (!role) {
      return res.status(404).json({ error: 'Role não encontrada' });
    }
    res.status(200).json(role.Permissaos);
  } catch (error) {
    console.error('Erro ao listar permissões da role:', error);
    res.status(500).json({ error: 'Erro ao listar permissões' });
  }
};

exports.add = async (req, res) => {
  try {
    const { id } = req.params; // role id
    const { permissao_id } = req.body;
    const role = await Role.findByPk(id);
    const permissao = await Permissao.findByPk(permissao_id);
    if (!role || !permissao) {
      return res.status(404).json({ error: 'Role ou permissão não encontrada' });
    }
    await RolePermissao.create({ role_id: id, permissao_id });
    res.status(201).json({ message: 'Permissão adicionada ao role' });
  } catch (error) {
    console.error('Erro ao adicionar permissão ao role:', error);
    res.status(500).json({ error: 'Erro ao adicionar permissão' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id, permissaoId } = req.params;
    const mapping = await RolePermissao.findOne({
      where: { role_id: id, permissao_id: permissaoId }
    });
    if (!mapping) {
      return res.status(404).json({ error: 'Associação não encontrada' });
    }
    await mapping.destroy();
    res.status(200).json({ message: 'Permissão removida do role' });
  } catch (error) {
    console.error('Erro ao remover permissão do role:', error);
    res.status(500).json({ error: 'Erro ao remover permissão' });
  }
};
