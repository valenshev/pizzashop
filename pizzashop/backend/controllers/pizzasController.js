const {Pizza, Size, Ingredient, Category} = require('../models');
const {Op} = require('sequelize');

const SORTABLE = new Set(['created_at', 'name'])

const limit = 10;
const offset = 1;
const page = 1;

// export const getPizzas = async (req, res) => {
//     const pizzas = {
//         'margarita': {
//             'name': 'margarita'
//         }
//     }
//     return res.status(200).json(pizzas);
// }
async function createPizza(req, res, next) {
    try {
        const pizza = await Pizza.create({
            name: req.body.name,
            price: req.body.price,
        });
        res.status(201).json(pizza)
    } catch(e) {
        next(e);
    }
}

async function getAllPizzas(req, res, next) {
    try {
        const pizzas = await Pizza.findAll(
            // необязательные параметры
            {
                attributes: ['id', 'description'],
                order: [['id', 'ASC']]
            }
        );
        if (!pizzas) {
            res.status(404).json({
                message: 'not found'
            })
        }
        res.json(pizzas);
    } catch(err) {
        next(err);
    }
}
async function findPizzasWithSizesIngredients(req, res, next) {
  try {
    const {rows, count} = await Pizza.findAndCountAll({
      where: {},
      include: [
        {
          model: Size,
          as: 'pizzaSize',
          attributes: ['id']
        },
        {
          model: Ingredient,
          as: 'pizzaIngredient',
          attributes: ['id']
        },
        {
          model: Category,
          as: 'pizzaCategory',
          attributes: ['id']
        }
      ],
      pizza: [['created_at']],
      limit,
      offset
    });

    res.json({
      data: rows,
      meta: {
        page,
        limit,
        total: count
      }
    })
  } catch(e) {
    next(e);
  }
}


module.exports = {createPizza, getAllPizzas, findPizzasWithSizesIngredients};