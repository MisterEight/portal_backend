const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');
const rolePermissaoController = require('../controllers/rolePermissaoController');
const ownership = require('../middleware/ownershipMiddleware');

router.post('/', ownership('ADMIN'), rolesController.create);
router.put('/:id', ownership('ADMIN'), rolesController.update);
router.get('/', ownership('ADMIN'), rolesController.getAll);
router.get('/:id', ownership('ADMIN'), rolesController.getById);
router.delete('/:id', ownership('ADMIN'), rolesController.remove);

router.get('/:id/permissoes', ownership('ADMIN'), rolePermissaoController.list);
router.post('/:id/permissoes', ownership('ADMIN'), rolePermissaoController.add);
router.delete('/:id/permissoes/:permissaoId', ownership('ADMIN'), rolePermissaoController.remove);

module.exports = router;
