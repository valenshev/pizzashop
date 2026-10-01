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
      },
      sizes: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      }
    },
    {
      tableName: 'sizes',
      timestamps: true,
      underscored: true // created_at vs createdAt
    }
  );

  Size.associate = (models) => {
    
  }

  return Size;
}