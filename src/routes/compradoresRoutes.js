const express = require('express');
const router = express.Router();
const compradorController = require('../controllers/compradoresController');

//GET / LISTA POR ID
router.get('/:id', compradorController.getById);

// GET /compradores
router.get('/', compradorController.getAll)

// POST /compradores
router.post('/', compradorController.create);

// PUT /compradores/:id
router.put('/:id', compradorController.update);

// DELETE /compradores/:id
router.delete('/:id', compradorController.delete);

//Garantir integração com licitacoes.
module.exports = router;