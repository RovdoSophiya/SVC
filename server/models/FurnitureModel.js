const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const FurnitureModel = sequelize.define(
  "FurnitureModel",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    model: { type: DataTypes.STRING, unique: true, allowNull: false },
    specifications: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    sequelize,
    modelName: "FurnitureModel",
    tableName: "furnituremodel",
    timestamps: false,
  }
);

module.exports = FurnitureModel;
