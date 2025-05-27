const express = require('express');
const router = express.Router();
const feriadosController = require('../controllers/feriadosController');

router.get('/', feriadosController.getAll);
router.post('/', feriadosController.create);
router.put('/:id', feriadosController.update);
router.delete('/:id', feriadosController.delete);

module.exports = router;