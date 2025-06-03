const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Usuario = require('../models/Usuarios');

const SECRET_KEY = process.env.SECRET_KEY || 'segredo';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
});

async function recuperarSenha(req, res) {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado com esse e-mail.' });
    }

    const token = jwt.sign({ id: usuario.usuario_id }, SECRET_KEY, { expiresIn: '30m' });
    const link = `${FRONTEND_URL}/resetar-senha?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Recuperação de Senha',
      html: `<p>Olá,</p><p>Clique no link abaixo para redefinir sua senha:</p>
             <a href="${link}">${link}</a>
             <p>Este link expira em 30 minutos.</p>`
    });

    res.status(200).json({ message: 'E-mail de recuperação enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail de recuperação:', error);
    res.status(500).json({ message: 'Erro ao tentar recuperar senha.' });
  }
}

async function resetarSenha(req, res) {
  const { token, novaSenha } = req.body;

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const usuario = await Usuario.findByPk(payload.id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    usuario.senha_hash = novaSenha;
    usuario.data_atualizacao = new Date();
    await usuario.save();

    res.status(200).json({ message: 'Senha redefinida com sucesso!' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(400).json({ message: 'Token inválido ou expirado.' });
  }
}

module.exports = {
  recuperarSenha,
  resetarSenha
};
