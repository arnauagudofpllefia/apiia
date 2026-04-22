const express = require('express');
const bacallaController = require('../controllers/bacallaController');

const router = express.Router();

router.get('/', bacallaController.listBacalla);
router.get('/:id', bacallaController.getBacallaById);
router.post('/', bacallaController.createBacalla);
router.put('/:id', bacallaController.updateBacalla);
router.delete('/:id', bacallaController.deleteBacalla);

module.exports = router;
