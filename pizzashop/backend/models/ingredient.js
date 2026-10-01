const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define(
    'Ingredient',
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
      // description: {
      //   type: DataTypes.STRING(255),
      //   allowNull: true,
      // },
      
    },
    {
      tableName: 'ingredients',
      timestamps: true,
      underscored: true // created_at vs createdAt
    }
  );

     Ingredient.associate = (models) => {
     Ingredient.hasMany(models.Pizza, {
      foreignKey: 'ingredient_id',
      as: 'pizza'
    })
  }

  return Ingredient;
}