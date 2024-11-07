const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Order = require("./Order");
const Dish = require("./Dish");

class OrderedDish extends Model {}

OrderedDish.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderid: {
      type: DataTypes.INTEGER,
      references: { model: Order, key: "id" },
    },
    dishid: { type: DataTypes.INTEGER, references: { model: Dish, key: "id" } },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    totalprice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    sequelize,
    modelName: "OrderedDish",
    tableName: "OrderedDish",
    timestamps: false,
  }
);

Order.hasMany(OrderedDish, { foreignKey: "orderid" });
OrderedDish.belongsTo(Order, { foreignKey: "orderid" });
Dish.hasMany(OrderedDish, { foreignKey: "dishid" });
OrderedDish.belongsTo(Dish, { foreignKey: "dishid" });

module.exports = OrderedDish;
