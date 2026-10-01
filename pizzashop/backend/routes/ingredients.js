const express = require('express');
const ingredientsController = require('../controllers/ingredientsController');

const router = express.Router();

router.get('/', ingredientsController.findAll);

module.exports = router;