const Usuario = require('../models/Usuarios');

// Listar todos os usuarios
exports.getAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuarios:', error);
    res.status(500).json({ error: 'Erro ao listar usuarios' });
  }
};

// Criar usuarios
exports.create = async (req, res) => {
    try {
      const {
        usuario_id,
        nome,
        login,
        email,
        cpf,
        senha_hash,
        ativo,
        data_criacao,
        data_atualizacao
      } = req.body;

      const novoUsuario = await Usuario.create({
        usuario_id,
        nome,
        login,
        email,
        cpf,
        senha_hash,
        ativo,
        data_criacao,
        data_atualizacao
      });
  
      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error('Erro ao criar um novo Usuario:', error);
      res.status(500).json({ error: 'Erro ao criar um novo Usuario' });
    }
  };

// Atualizar um usuario 
exports.update = async (req, res) => {
    try {
      const { id } = req.params; // Pega o ID da URL
      const {
        usuario_id,
        nome,
        login,
        email,
        cpf,
        senha_hash,
        ativo,
        data_criacao,
        data_atualizacao
      } = req.body;
  
      const usuario = await Usuario.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario não encontrado' });
      }
  
      // atualização
      await usuario.update({
        usuario_id,
        nome,
        login,
        email,
        cpf,
        senha_hash,
        ativo,
        data_criacao,
        data_atualizacao 
      });
  
      res.status(200).json(usuario);
    } catch (error) {
      console.error('Erro ao atualizar os dados do usuario:', error);
      res.status(500).json({ error: 'Erro ao atualizar usuario' });
    }
  };

  // Deletar um usuario
exports.delete = async (req, res) => {
    try {
      const { id } = req.params; // Pega o ID da URL
  
      const usuario = await Usuario.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario não encontrada' });
      }
  
      await usuario.destroy(); // Deleta a licitação do banco
  
      res.status(200).json({ message: 'Usuario deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar usuario:', error);
      res.status(500).json({ error: 'Erro ao deletar usuario' });
    }
  };  