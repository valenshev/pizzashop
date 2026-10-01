const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
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
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: 'categories',
      timestamps: true,
      underscored: true // created_at vs createdAt
    }
  );

    Category.associate = (models) => {
    Category.hasMany(models.Pizza, {
    foreignKey: 'category_id',
      as: 'pizza'
    })
  }

  return Category;
}