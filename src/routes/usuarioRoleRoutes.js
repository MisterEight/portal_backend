const express = require('express');
const router = express.Router();
const usuarioRoleController = require('../controllers/usuarioRoleController');
const ownership = require('../middleware/ownershipMiddleware');

router.get('/:id/roles', ownership('ADMIN'), usuarioRoleController.list);
router.post('/:id/roles', ownership('ADMIN'), usuarioRoleController.add);
router.delete('/:id/roles/:roleId', ownership('ADMIN'), usuarioRoleController.remove);

module.exports = router;
