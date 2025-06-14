const Documento = require('../models/Documento');

exports.upload = async (req, res) => {
  try {
    const { titulo, grupo_id, categoria_id } = req.body;
    const caminho_arquivo = req.file ? req.file.path : null;

    const documento = await Documento.create({
      titulo,
      grupo_id,
      categoria_id,
      caminho_arquivo
    });

    res.status(201).json(documento);
  } catch (error) {
    console.error('Erro ao salvar documento:', error);
    res.status(500).json({ error: 'Erro ao salvar documento' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const documentos = await Documento.findAll();
    res.status(200).json(documentos);
  } catch (error) {
    console.error('Erro ao listar documentos:', error);
    res.status(500).json({ error: 'Erro ao listar documentos' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const documento = await Documento.findByPk(id);

    if (!documento) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }

    res.status(200).json(documento);
  } catch (error) {
    console.error('Erro ao buscar documento:', error);
    res.status(500).json({ error: 'Erro ao buscar documento' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const documento = await Documento.findByPk(id);

    if (!documento) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }

    await documento.destroy();

    res.status(200).json({ message: 'Documento deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar documento:', error);
    res.status(500).json({ error: 'Erro ao deletar documento' });
  }
};
