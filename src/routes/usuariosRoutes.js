const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');
const ownership = require('../middleware/ownershipMiddleware');

router.get('/:id', usuarioController.getById);

// GET /Usuarios
router.get('/', usuarioController.getAll)

// POST /Usuarios
router.post('/', ownership('ADMIN'), usuarioController.create);

// PUT /Usuarios/:id
router.put('/:id', ownership('ADMIN'), usuarioController.update);

// DELETE /Usuarios/:id
router.delete('/:id', ownership('ADMIN'), usuarioController.delete);

module.exports = router;
