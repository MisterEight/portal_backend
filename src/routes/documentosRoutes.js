const express = require('express');
const router = express.Router();
const multer = require('multer');
const documentoController = require('../controllers/documentoController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('arquivo'), documentoController.upload);
router.get('/', documentoController.getAll);
router.get('/:id', documentoController.getById);
router.delete('/:id', documentoController.delete);

module.exports = router;
