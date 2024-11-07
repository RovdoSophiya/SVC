const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Client = require("./Client");
const Dish = require("./Dish");

class Cart extends Model {}

Cart.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clientid: {
      type: DataTypes.INTEGER,
      references: { model: Client, key: "id" },
    },
    dishid: { type: DataTypes.INTEGER, references: { model: Dish, key: "id" } },
    count: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
  },
  {
    sequelize,
    modelName: "Cart",
    tableName: "Cart",
    timestamps: false,
  }
);

Client.hasMany(Cart, { foreignKey: "clientid" });
Cart.belongsTo(Client, { foreignKey: "clientid" });
Dish.hasMany(Cart, { foreignKey: "dishid" });
Cart.belongsTo(Dish, { foreignKey: "dishid" });

module.exports = Cart;
