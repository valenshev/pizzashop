const express = require('express');
const sizesController = require('../controllers/sizesController');

const router = express.Router();

router.get('/', sizesController.getSizes);

module.exports = router;