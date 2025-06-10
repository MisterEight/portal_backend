const Comprador = require('../models/Comprador');

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const comprador = await Comprador.findByPk(id);

    if (!comprador) {
      return res.status(404).json({ error: 'Comprador não encontrado' });
    }

    res.status(200).json(comprador);
  } catch (error) {
    console.error('Erro ao buscar comprador:', error);
    res.status(500).json({ error: 'Erro ao buscar comprador' });
  }
};

// Listar todos os compradores
exports.getAll = async (req, res) => {
  try {
    const compradores = await Comprador.findAll();
    res.status(200).json(compradores);
  } catch (error) {
    console.error('Erro ao listar compradores:', error);
    res.status(500).json({ error: 'Erro ao listar Compradores' });
  }
};

// Criar comprador
exports.create = async (req, res) => {
    try {
      const {
        comprador_id,
        nome,
        erp_utilizado,
        possui_power_bi,
        ativo,
        data_criacao,
        data_atualizacao
      } = req.body;
  
      const novoComprador = await Comprador.create({
        comprador_id,
        nome,
        erp_utilizado,
        possui_power_bi,
        ativo,
        data_criacao,
        data_atualizacao
      });
  
      res.status(201).json(novoComprador);
    } catch (error) {
      console.error('Erro ao criar um novo comprador:', error);
      res.status(500).json({ error: 'Erro ao criar um novo comprador' });
    }
  };

// Atualizar um comprador 
exports.update = async (req, res) => {
    try {
      const { id } = req.params; // Pega o ID da URL
      const {
        comprador_id,
        nome,
        erp_utilizado,
        possui_power_bi,
        ativo,
        data_criacao,
        data_atualizacao
      } = req.body;
  
      const comprador = await Comprador.findByPk(id);
  
      if (!comprador) {
        return res.status(404).json({ error: 'Comprador não encontrado' });
      }
  
      // atualização
      await comprador.update({
        comprador_id,
        nome,
        erp_utilizado,
        possui_power_bi,
        ativo,
        data_criacao,
        data_atualizacao
      });
  
      res.status(200).json(comprador);
    } catch (error) {
      console.error('Erro ao atualizar os dados do comprador:', error);
      res.status(500).json({ error: 'Erro ao atualizar comprador' });
    }
  };

  // Deletar um comprador
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const comprador = await Comprador.findByPk(id);

    if (!comprador) {
      return res.status(404).json({ error: 'Comprador não encontrado' });
    }

    if (!comprador.ativo) {
      return res.status(400).json({ error: 'Comprador já está inativo' });
    }

    comprador.ativo = false;
    await comprador.save();

    res.status(200).json({ message: 'Comprador desativado com sucesso' });
  } catch (error) {
    console.error('Erro ao desativar comprador:', error);
    res.status(500).json({ error: 'Erro ao desativar comprador' });
  }
};

