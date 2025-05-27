const express = require('express');
const router = express.Router();

const users = [
    { username: 'admin', password: '123456' },
    { username: 'user', password: 'senha123' }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }

  return res.status(200).json({ message: 'Login realizado com sucesso!' });
});

module.exports = router;