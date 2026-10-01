const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = express.Router();

router.get('/', categoriesController.findAll);

module.exports = router;