const express = require('express');
const router = express.Router();
const compradorController = require('../controllers/compradoresController');
const ownership = require('../middleware/ownershipMiddleware');

//GET / LISTA POR ID
router.get('/:id', compradorController.getById);

// GET /compradores
router.get('/', compradorController.getAll)

// POST /compradores
router.post('/', ownership('ADMIN'), compradorController.create);

// PUT /compradores/:id
router.put('/:id', ownership('ADMIN'), compradorController.update);

// DELETE /compradores/:id
router.delete('/:id', ownership('ADMIN'), compradorController.delete);

//Garantir integração com licitacoes.
module.exports = router;

