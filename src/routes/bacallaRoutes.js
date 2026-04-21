const express = require('express');
const bacallaController = require('../controllers/bacallaController');

const router = express.Router();

router.get('/', bacallaController.listBacalla);
router.get('/:id', bacallaController.getBacallaById);
router.post('/', bacallaController.createBacalla);

module.exports = router;
