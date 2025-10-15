const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuarios');
const UsuarioRole = require('../models/UsuarioRole');
const Role = require('../models/Role');

const SECRET_KEY = process.env.SECRET_KEY || 'segredo';

exports.login = async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({ message: 'Login e senha são obrigatórios.' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { login } });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const passwordMatch = await bcrypt.compare(senha, usuario.senha_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const userRoles = await UsuarioRole.findAll({
      where: { usuario_id: usuario.usuario_id },
      include: [{ model: Role, attributes: ['nome'] }]
    });
    const roles = userRoles.map(ur => ({
      nome: ur.Role.nome,
      comprador_id: ur.comprador_id,
      unidade_id: ur.unidade_id
    }));

    const token = jwt.sign(
      { id: usuario.usuario_id, login: usuario.login, roles },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ message: 'Erro ao realizar login' });
  }
};

