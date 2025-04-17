const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = 'escolhe dps'; 

const users = [
  { username: 'adm', password: '1234' },
  { username: 'use', password: '123' }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }

 
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  return res.status(200).json({
    message: 'Login realizado com sucesso!',
    token: token
  });
});

module.exports = router;