const Unidade = require('../models/Unidade');

exports.createUnidade = async (req, res) => {
  try {
    const {
      comprador_id,
      nome,
      sigla,
      telefone,
      endereco,
      bairro,
      cep,
      uf,
      cidade
    } = req.body;

    const unidade = await Unidade.create({
      comprador_id,
      nome,
      sigla,
      telefone,
      endereco,
      bairro,
      cep,
      uf,
      cidade
    });

    // HTTP 201 Created
    return res.status(201).json(unidade);
  } catch (err) {
    console.error('Erro ao registrar unidade:', err);
    return res.status(500).json({ error: 'Não foi possível criar a unidade.' });
  }
};