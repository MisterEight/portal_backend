const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = 'segredo'; 

const users = [
  { username: 'admin', password: '123456' },
  { username: 'user', password: 'senha123' }
];

router.post('/', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  return res.status(200).json({
    message: 'Login realizado com sucesso!',
    token: token
  });
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}

router.get('/perfil', authenticateToken, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.username}!` });
});

module.exports = router;