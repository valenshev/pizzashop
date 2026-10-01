const {Size} = require('../models');
const {Op} = require('sequelize');

const SORTABLE = new Set(['created_at', 'email']);

 async function getSizes(req, res, next) {
  try {
    const sizes = await Size.findAll();
    res.json(sizes);
  } catch (e) {
    next(e);
  }
}   

 module.exports = {getSizes}
