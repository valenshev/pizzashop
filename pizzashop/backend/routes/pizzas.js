const express = require('express');
const pizzasController = require('../controllers/pizzasController');

const router = express.Router();

router.get('/', pizzasController.getAllPizzas);

module.exports = router;