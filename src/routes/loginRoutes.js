const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || 'segredo';

// Usuários mockados para teste
const users = [
  { username: 'admin', password: '123456' },
  { username: 'user', password: 'senha123' }
];

// POST /api/login
router.post('/', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login realizado com sucesso!', token });
});

module.exports = router;
