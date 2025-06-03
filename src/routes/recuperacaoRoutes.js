const express = require('express');
const router = express.Router();
const recuperacaoController = require('../controllers/recuperacaoController');

router.post('/recuperar-senha', recuperacaoController.recuperarSenha);
router.post('/resetar-senha', recuperacaoController.resetarSenha);

module.exports = router;