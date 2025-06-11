const express = require('express');
const router = express.Router();
const permissaoController = require('../controllers/permissaoController');
const ownership = require('../middleware/ownershipMiddleware');

router.post('/', ownership('ADMIN'), permissaoController.create);

module.exports = router;
