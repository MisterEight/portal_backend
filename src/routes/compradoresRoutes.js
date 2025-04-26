const express = require('express');
const router = express.Router();
const compradorController = require('../controllers/compradoresController');

// GET /compradores
router.get('/', compradorController.getAll);

// POST /compradores
router.post('/', compradorController.create);

// PUT /compradores/:id
router.put('/:id', compradorController.update);

// DELETE /compradores/:id
router.delete('/:id', compradorController.delete);


//Validar cnpj
//Garantir integração com licitacoes.
module.exports = router;
