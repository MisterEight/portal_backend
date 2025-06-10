const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuarios');

exports.register = async (req, res) => {
  const { nome, login, email, cpf, senha } = req.body;

  if (!nome || !login || !email || !cpf || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const hashed = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({
      nome,
      login,
      email,
      cpf,
      senha_hash: hashed
    });
    return res.status(201).json({ id: usuario.usuario_id });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

