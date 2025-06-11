const express = require('express');
const router = express.Router();
const permissaoController = require('../controllers/permissaoController');
const ownership = require('../middleware/ownershipMiddleware');

router.post('/', ownership('ADMIN'), permissaoController.create);
router.put('/:id', ownership('ADMIN'), permissaoController.update);
router.get('/', ownership('ADMIN'), permissaoController.getAll);
router.get('/:id', ownership('ADMIN'), permissaoController.getById);
router.delete('/:id', ownership('ADMIN'), permissaoController.remove);

module.exports = router;
