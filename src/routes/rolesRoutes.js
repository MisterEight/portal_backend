const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');
const rolePermissaoController = require('../controllers/rolePermissaoController');
const authorizeRole = require('../middleware/authorizeRole');

router.post('/', authorizeRole('ADMIN'), rolesController.create);
router.put('/:id', authorizeRole('ADMIN'), rolesController.update);
router.get('/', authorizeRole('ADMIN'), rolesController.getAll);
router.get('/:id', authorizeRole('ADMIN'), rolesController.getById);
router.delete('/:id', authorizeRole('ADMIN'), rolesController.remove);

router.get('/:id/permissoes', authorizeRole('ADMIN'), rolePermissaoController.list);
router.post('/:id/permissoes', authorizeRole('ADMIN'), rolePermissaoController.add);
router.delete('/:id/permissoes/:permissaoId', authorizeRole('ADMIN'), rolePermissaoController.remove);

module.exports = router;
