const {Ingredient} = require('../models');
const {Op} = require('sequelize');

async function findAll(req, res, next) {
  try {
    const ingredients = await Ingredient.findAll();
    if (!ingredients) {
      res.status(404).json({
        message: 'Inredients not found'
      })
    }
    res.json(ingredients);
  } catch(e) {
    next(e);
  }
}

module.exports = {findAll}