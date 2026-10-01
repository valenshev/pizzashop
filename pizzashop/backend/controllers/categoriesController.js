const {Category} = require('../models');

async function findAll(req, res, next) {
  try {
      const categories = await Category.findAll()
      res.json(categories)
  }
  catch(err) {
    next (err);
  }
}

module.exports = {findAll}