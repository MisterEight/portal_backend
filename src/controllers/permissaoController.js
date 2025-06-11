const Permissao = require('../models/Permissao');

exports.create = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const perm = await Permissao.create({ nome, descricao });
    res.status(201).json(perm);
  } catch (error) {
    console.error('Erro ao criar permissao:', error);
    res.status(500).json({ error: 'Erro ao criar permissao' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    const perm = await Permissao.findByPk(id);
    if (!perm) {
      return res.status(404).json({ error: 'Permissão não encontrada' });
    }
    await perm.update({ nome, descricao });
    res.status(200).json(perm);
  } catch (error) {
    console.error('Erro ao atualizar permissao:', error);
    res.status(500).json({ error: 'Erro ao atualizar permissao' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const perms = await Permissao.findAll();
    res.status(200).json(perms);
  } catch (error) {
    console.error('Erro ao listar permissoes:', error);
    res.status(500).json({ error: 'Erro ao listar permissoes' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const perm = await Permissao.findByPk(id);
    if (!perm) {
      return res.status(404).json({ error: 'Permissão não encontrada' });
    }
    res.status(200).json(perm);
  } catch (error) {
    console.error('Erro ao buscar permissao:', error);
    res.status(500).json({ error: 'Erro ao buscar permissao' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const perm = await Permissao.findByPk(id);
    if (!perm) {
      return res.status(404).json({ error: 'Permissão não encontrada' });
    }
    await perm.destroy();
    res.status(200).json({ message: 'Permissão deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar permissao:', error);
    res.status(500).json({ error: 'Erro ao deletar permissao' });
  }
};
