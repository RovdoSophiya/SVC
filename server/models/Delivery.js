const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Order = require("./Order");
const Courier = require("./Courier");

class Delivery extends Model {}

Delivery.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderid: {
      type: DataTypes.INTEGER,
      references: { model: Order, key: "id" },
    },
    courierid: {
      type: DataTypes.INTEGER,
      references: { model: Courier, key: "id" },
    },
    deliveryaddress: { type: DataTypes.STRING, allowNull: false },
    deliverydate: DataTypes.DATE,
    status: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Delivery",
    tableName: "Delivery",
    timestamps: false,
  }
);

Order.hasOne(Delivery, { foreignKey: "orderid" });
Delivery.belongsTo(Order, { foreignKey: "orderid" });
Courier.hasMany(Delivery, { foreignKey: "courierid" });
Delivery.belongsTo(Courier, { foreignKey: "courierid" });

module.exports = Delivery;
