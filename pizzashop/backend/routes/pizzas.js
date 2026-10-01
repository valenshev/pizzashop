const express = require('express');
const pizzasController = require('../controllers/pizzasController');
const pizza = require('../models/pizza');

const router = express.Router();

router.get('/', pizzasController.getAllPizzas);
router.get('/findAllPizzas', pizzasController.findPizzasWithSizesIngredients)

module.exports = router;