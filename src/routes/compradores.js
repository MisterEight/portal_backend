const express = require('express');
const router = express.Router();

// GET /compradores
router.get('/', (req, res) => {
  // Listar compradores
});

// POST /compradores
router.post('/', (req, res) => {
  // Criar comprador
});

// PUT /compradores/:id
router.put('/:id', (req, res) => {
  // Atualizar comprador
});

// DELETE /compradores/:id
router.delete('/:id', (req, res) => {
  // Deletar comprador
});

module.exports = router;
