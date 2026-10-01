const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define(
    'Pizza',
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
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      size_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }

    },
    {
      tableName: 'pizzas',
      timestamps: true,
      underscored: true // created_at vs createdAt
    }
  );

  
  Pizza.associate = (models) => {
    Pizza.belongsTo(models.Ingredient, {
      foreignKey: 'ingredient_id',
      as: 'pizzaIngredient'
    }),
    Pizza.belongsTo(models.Size, {
      foreignKey: 'size_id',
      as: 'pizzaSize'
    }),
    Pizza.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'pizzaCategory'
    })
  }
  return Pizza;
}