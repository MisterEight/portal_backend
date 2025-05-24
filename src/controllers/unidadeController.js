const Unidade = require('../models/Unidade');

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const unidade = await Unidade.findByPk(id);

    if (!unidade) {
      return res.status(404).json({ error: 'Unidade não encontrado' });
    }

    res.status(200).json();
  } catch (error) {
    console.error('Erro ao buscar unidade:', error);
    res.status(500).json({ error: 'Erro ao buscar unidade' });
  }
};

// Listar todos os compradores
exports.getAll = async (req, res) => {
  try {
    const unidades = await Unidade.findAll();
    res.status(200).json(unidades);
  } catch (error) {
    console.error('Erro ao listar unidades:', error);
    res.status(500).json({ error: 'Erro ao listar unidades' });
  }
};
//criar unidade
exports.create = async (req, res) => {
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

exports.update = async (req, res) => {
    try {
      const { id } = req.params; // Pega o ID da URL
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
  
      const unidade = await Unidade.findByPk(id);
  
      if (!unidade) {
        return res.status(404).json({ error: 'Unidade não encontrado' });
      }
  
      // atualização
      await unidade.update({
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
  
      res.status(200).json(unidade);
    } catch (error) {
      console.error('Erro ao atualizar os dados do unidade:', error);
      res.status(500).json({ error: 'Erro ao atualizar unidade' });
    }
  };

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const unidade = await Unidade.findByPk(id);

    if (!unidade) {
      return res.status(404).json({ error: 'unidade não encontrado' });
    }

    await unidade.destroy();

    res.status(200).json({ message: 'Unidade deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar unidade:', error);
    res.status(500).json({ error: 'Erro ao deletar unidade' });
  }
};