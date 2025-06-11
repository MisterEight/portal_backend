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
