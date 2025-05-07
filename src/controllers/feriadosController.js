const FeriadoModel = require('../models/feriados');

// Listar todos os feriados
exports.getAll = async (req, res) => {
  try {
    const feriados = await FeriadoModel.findAll();
    res.status(200).json(feriados);
  } catch (error) {
    console.error('Erro ao listar feriados:', error);
    res.status(500).json({ error: 'Erro ao listar feriados' });
  }
};

// Adicionar feriado
exports.create = async (req, res) => {
  const { data_feriado, descricao } = req.body;

  if (!data_feriado) {
    return res.status(400).json({ erro: "O campo 'data_feriado' é obrigatório." });
  }

  try {
    const novoFeriado = await FeriadoModel.create({
      data_feriado,
      descricao,
      data_criacao: new Date(),
      data_atualizacao: new Date()
    });

    res.status(201).json({ mensagem: 'Feriado cadastrado com sucesso.', feriado: novoFeriado });
  } catch (error) {
    console.error('Erro ao inserir feriado:', error);
    res.status(500).json({ erro: 'Erro interno ao cadastrar feriado.' });
  }
};

// Atualizar um feriado existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      data_feriado,
      descricao,
      data_criacao,
      data_atualizacao
    } = req.body;

    const feriado = await FeriadoModel.findByPk(id);

    if (!feriado) {
      return res.status(404).json({ error: 'Feriado não encontrado' });
    }

    await feriado.update({
      data_feriado,
      descricao,
      data_criacao,
      data_atualizacao
    });

    res.status(200).json(feriado);
  } catch (error) {
    console.error('Erro ao atualizar feriado:', error);
    res.status(500).json({ error: 'Erro ao atualizar feriado' });
  }
};

// Deletar um feriado
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const feriado = await FeriadoModel.findByPk(id);

    if (!feriado) {
      return res.status(404).json({ error: 'Feriado não encontrado' });
    }

    await feriado.destroy();

    res.status(200).json({ message: 'Feriado deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar feriado:', error);
    res.status(500).json({ error: 'Erro ao deletar feriado' });
  }
};
