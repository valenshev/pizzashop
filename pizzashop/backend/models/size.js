const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define(
    'Size',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
         allowNull: false,
      },
      sizes: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: 'sizes',
      timestamps: true,
      underscored: true // created_at vs createdAt
    }
  );

     Size.associate = (models) => {
     Size.hasMany(models.Pizza, {
      foreignKey: 'size_id',
      as: 'pizza'
    })
  }

  return Size;
}