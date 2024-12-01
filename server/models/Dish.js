const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class Dish extends Model {}

Dish.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: DataTypes.STRING,
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: true },
    isvegan: { type: DataTypes.BOOLEAN, allowNull: true },
    isglutenfree: { type: DataTypes.BOOLEAN, allowNull: true },
    isdietary: { type: DataTypes.BOOLEAN, allowNull: true },
  },
  {
    sequelize,
    modelName: "Dish",
    tableName: "Dish",
    timestamps: false,
  }
);

module.exports = Dish;
