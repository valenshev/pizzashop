const express = require('express');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

router.get('/', ordersController.findAll);
router.get('/withusers', ordersController.findOrdersWithUsers);

module.exports = router;