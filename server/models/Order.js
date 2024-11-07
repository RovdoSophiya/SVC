const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Client = require("./Client");

class Order extends Model {}

Order.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clientid: {
      type: DataTypes.INTEGER,
      references: { model: Client, key: "id" },
    },
    orderdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    totalamount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "Order",
    timestamps: false,
  }
);

Client.hasMany(Order, { foreignKey: "clientid" });
Order.belongsTo(Client, { foreignKey: "clientid" });

module.exports = Order;
