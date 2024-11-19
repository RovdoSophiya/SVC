const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Customer = require("./Customer");

const Contract = sequelize.define(
  "Contract",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customerid: {
      type: DataTypes.INTEGER,
      references: { model: Customer, key: "id" },
    },
    startdate: { type: DataTypes.DATE, allowNull: false },
    enddate: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    modelName: "Contract",
    tableName: "contract",
    timestamps: false,
  }
);

Contract.belongsTo(Customer, { foreignKey: "customerid", onDelete: "CASCADE" });
Customer.hasMany(Contract, { foreignKey: "customerid" });

module.exports = Contract;
