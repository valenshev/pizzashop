const {Order, User, OrderStatus, DeliveryType} = require('../models');
const {Op} = require('sequelize');

const limit = 10;
const offset = 0;
const page = 1;

async function findAll(req, res, next) {
  try {
    const orders = await Order.findAll();
    if (!orders) {
      res.status(404).json({
        message: 'orders not found'
      })
    }
    res.json(orders);
  } catch(e) {
    next(e);
  }
}

async function findOrdersWithUsers(req, res, next) {
  try {
    const {rows, count} = await Order.findAndCountAll({
      where: {},
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email']
        },
        {
          model: OrderStatus,
          as: 'orderStatus',
          attributes: ['id']
        },
        {
          model: DeliveryType,
          as: 'deliveryType',
          attributes: ['id']
        }
      ],
      order: [['created_at']],
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

module.exports = {findAll, findOrdersWithUsers}