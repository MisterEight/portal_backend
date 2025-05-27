const express = require('express');
const router = express.Router();
const unidadeController  = require('../controllers/unidadeController');

router.get('/:id', unidadeController.getById);

router.get('/', unidadeController.getAll);

router.post('/', unidadeController.create);

router.put('/:id', unidadeController.update);

router.delete('/:id', unidadeController.delete);

module.exports = router;