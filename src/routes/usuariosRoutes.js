const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/:id', usuarioController.getById);

// GET /Usuarios
router.get('/', authenticateToken, usuarioController.getAll);

// POST /Usuarios
router.post('/', authenticateToken, usuarioController.create);

// PUT /Usuarios/:id
router.put('/:id', authenticateToken, usuarioController.update);

// DELETE /Usuarios/:id
router.delete('/:id', authenticateToken, usuarioController.delete);

module.exports = router;