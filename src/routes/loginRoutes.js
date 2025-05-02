const express = require('express');
const router = express.Router();

//const SECRET_KEY = 'segredo';

const users = [
  //  { username: 'admin', password: '123456' },
  //  { username: 'user', password: 'senha123' }
];

router.post('/', (req, res) => {
  const { username, password, email, cpf } = req.body;

  if (!username || !password || !email || !cpf) {
    return res.status(400).json({ message: 'Username, password, email e cpf são obrigatórios.' });
  }

  const userExists = users.find(u => u.username === username || u.email === email || u.cpf === cpf);
  if (userExists) {
    return res.status(409).json({ message: 'Usuário com o mesmo username, email ou cpf já existe.' });
  }

  users.push({ username, password, email, cpf });
  return res.status(201).json({ message: 'Usuário criado com sucesso!' });
});

router.get('/', (req, res) => {
  const safeUsers = users.map(({ username }) => ({ username}));
  res.status(200).json(safeUsers);
});
module.exports = router;