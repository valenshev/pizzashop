const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      
      delivery_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

    },
    {
      tableName: 'orders',
      timestamps: true,
      underscored: true // created_at vs createdAt
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.DeliveryType, {
      foreignKey: 'delivery_type',
      as: 'deliveryType'
    }),
    Order.belongsTo(models.OrderStatus, {
      foreignKey: 'order_status',
      as: 'orderStatus'
    }),
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
  }

  return Order;
}