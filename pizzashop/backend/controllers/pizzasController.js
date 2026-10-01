const {Pizza} = require('../models');
const {Op} = require('sequelize');

const SORTABLE = new Set(['created_at', 'name'])

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
            res.send(404).json({
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
          model: Pizza,
          as: 'pizza',
          attributes: ['id']
        },
        {
          model: Size,
          as: 'size',
          attributes: ['id']
        },
        {
          model: Ingredient,
          as: 'ingredient',
          attributes: ['id']
        },
        {
          model: Category,
          as: 'category',
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