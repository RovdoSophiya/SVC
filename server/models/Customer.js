const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Customer = sequelize.define(
  "Customer",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Customer",
    tableName: "customer",
    timestamps: false,
  }
);

module.exports = Customer;
