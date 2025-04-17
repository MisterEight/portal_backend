const express = require('express');
const router = express.Router();
const { createUnidade } = require('../controllers/unidadeController');

router.post('/unidades', createUnidade);

module.exports = router;