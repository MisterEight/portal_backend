const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');

router.get('/:id', usuarioController.getById);

// GET /Usuarios
router.get('/', usuarioController.getAll)

// POST /Usuarios
router.post('/', usuarioController.create);

// PUT /Usuarios/:id
router.put('/:id', usuarioController.update);

// DELETE /Usuarios/:id
router.delete('/:id', usuarioController.delete);

module.exports = router;