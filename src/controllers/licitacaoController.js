const Licitacao = require('../models/Licitacao');

// Listar todas as licitações
exports.getAll = async (req, res) => {
  try {
    const licitacoes = await Licitacao.findAll();
    res.status(200).json(licitacoes);
  } catch (error) {
    console.error('Erro ao listar licitações:', error);
    res.status(500).json({ error: 'Erro ao listar licitações' });
  }
};

// Criar uma nova licitação
exports.create = async (req, res) => {
  try {
    const {
      comprador_id,
      pregoeiro_id,
      ordenador_id,
      titulo,
      natureza,
      status,
      data_publicacao,
      ativa
    } = req.body;

    const novaLicitacao = await Licitacao.create({
      comprador_id,
      pregoeiro_id,
      ordenador_id,
      titulo,
      natureza,
      status,
      data_publicacao,
      ativa
    });

    res.status(201).json(novaLicitacao);
  } catch (error) {
    console.error('Erro ao criar licitação:', error);
    res.status(500).json({ error: 'Erro ao criar licitação' });
  }
};

// Atualizar uma licitação existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params; // Pega o ID da URL
    const {
      comprador_id,
      pregoeiro_id,
      ordenador_id,
      titulo,
      natureza,
      status,
      data_publicacao,
      ativa
    } = req.body;

    const licitacao = await Licitacao.findByPk(id);

    if (!licitacao) {
      return res.status(404).json({ error: 'Licitacao não encontrada' });
    }

    // Atualizando os campos da licitação
    await licitacao.update({
      comprador_id,
      pregoeiro_id,
      ordenador_id,
      titulo,
      natureza,
      status,
      data_publicacao,
      ativa
    });

    res.status(200).json(licitacao);
  } catch (error) {
    console.error('Erro ao atualizar licitação:', error);
    res.status(500).json({ error: 'Erro ao atualizar licitação' });
  }
};

// Deletar uma licitação
// Deletar uma licitação
exports.delete = async (req, res) => {
  try {
    const { id } = req.params; // Pega o ID da URL

    const licitacao = await Licitacao.findByPk(id);

    if (!licitacao) {
      return res.status(404).json({ error: 'Licitação não encontrada' });
    }

    if (!licitacao.ativa) {
      return res.status(400).json({ error: 'Não é possível deletar uma licitação inativa' });
    }

    await licitacao.destroy(); // Deleta a licitação do banco

    res.status(200).json({ message: 'Licitação deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar licitação:', error);
    res.status(500).json({ error: 'Erro ao deletar licitação' });
  }
};

