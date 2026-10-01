const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const DeliveryType = sequelize.define(
    'DeliveryType',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
         allowNull: false,
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      
    },
    {
      tableName: 'delivery_types',
      timestamps: true,
      underscored: true // created_at vs createdAt
    }
  );

  DeliveryType.associate = (models) => {
    DeliveryType.hasMany(models.Order, {
      foreignKey: 'delivery_type',
      as: 'orders'
    })
  }

  return DeliveryType;
}