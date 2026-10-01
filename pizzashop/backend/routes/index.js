const express = require('express');
const userRouter = require('./users');
const pizzasRouter = require('./pizzas');
const ingredientsRouter = require('./ingredients');
const categoriesRouter = require('./categories');
const ordersRouter = require('./orders');
const sizesRouter = require('./sizes');

const router = express.Router();

router.use('/users', userRouter);
router.use('/pizzas', pizzasRouter);
router.use('/ingredients', ingredientsRouter);
router.use('/categories', categoriesRouter);
router.use('/orders', ordersRouter);
router.use('/sizes', sizesRouter);

module.exports = router;