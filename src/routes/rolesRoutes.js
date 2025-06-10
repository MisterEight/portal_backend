const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');
const authorizeRole = require('../middleware/authorizeRole');

router.post('/', authorizeRole('ADMIN'), rolesController.create);
router.put('/:id', authorizeRole('ADMIN'), rolesController.update);

module.exports = router;
