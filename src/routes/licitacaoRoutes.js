const express = require('express');
const router = express.Router();

// GET /licitacao
router.get('/', (req, res) => {
  // Listar licitacao
});

// POST /licitacao
router.post('/', (req, res) => {
  // Criar licitacao
});

// PUT /licitacao/:id
router.put('/:id', (req, res) => {
  // Atualizar licitacao
});

// DELETE /licitacao/:id
router.delete('/:id', (req, res) => {
  // Deletar licitacao
});

module.exports = router;