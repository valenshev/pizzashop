const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const OrderStatus = sequelize.define(
    'OrderStatus',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
         allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }    
    },
    {
      tableName: 'order_statuses',
      timestamps: true,
      underscored: true // created_at vs createdAt
    }
  );

  OrderStatus.associate = (models) => {
     OrderStatus.hasMany(models.Order, {
      foreignKey: 'order_status',
      as: 'orders'
    })
  }

  return OrderStatus;
}