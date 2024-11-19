const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Contract = require("./Contract");
const FurnitureModel = require("./FurnitureModel");

const Sale = sequelize.define(
  "Sale",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contractid: {
      type: DataTypes.INTEGER,
      references: { model: Contract, key: "id" },
    },
    modelid: {
      type: DataTypes.INTEGER,
      references: { model: FurnitureModel, key: "id" },
    },
    furniturename: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Sale",
    tableName: "sale",
    timestamps: false,
  }
);

Sale.belongsTo(Contract, { foreignKey: "contractId", onDelete: "CASCADE" });
Sale.belongsTo(FurnitureModel, { foreignKey: "modelId", onDelete: "CASCADE" });
Contract.hasMany(Sale, { foreignKey: "contractId" });
FurnitureModel.hasMany(Sale, { foreignKey: "modelId" });

module.exports = Sale;
