const express = require('express');
const router = express.Router();
const unidadeController  = require('../controllers/unidadeController');
const ownership = require('../middleware/ownershipMiddleware');

router.get('/:id', unidadeController.getById);

router.get('/', unidadeController.getAll);

router.post('/', ownership('ADMIN'), unidadeController.create);

router.put('/:id', ownership('ADMIN'), unidadeController.update);

router.delete('/:id', ownership('ADMIN'), unidadeController.delete);

module.exports = router;
