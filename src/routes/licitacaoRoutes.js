const express = require('express');
const router = express.Router();
const licitacaoController = require('../controllers/licitacaoController');

// GET /licitacao
router.get('/', licitacaoController.getAll);

//GET / LISTA POR ID
router.get('/:id', licitacaoController.getById);

// POST /licitacao
router.post('/', licitacaoController.create);

// PUT /licitacao/:id
router.put('/:id', licitacaoController.update);

// DELETE /licitacao/:id
router.delete('/:id', licitacaoController.delete);

module.exports = router;

