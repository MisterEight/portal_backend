const Role = require('../models/Role');

exports.create = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const role = await Role.create({ nome, descricao });
    res.status(201).json(role);
  } catch (error) {
    console.error('Erro ao criar role:', error);
    res.status(500).json({ error: 'Erro ao criar role' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role não encontrada' });
    }
    await role.update({ nome, descricao });
    res.status(200).json(role);
  } catch (error) {
    console.error('Erro ao atualizar role:', error);
    res.status(500).json({ error: 'Erro ao atualizar role' });
  }
};
