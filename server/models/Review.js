const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Client = require("./Client");
const Order = require("./Order");

class Review extends Model {}

Review.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clientid: {
      type: DataTypes.INTEGER,
      references: { model: Client, key: "id" },
    },
    orderid: {
      type: DataTypes.INTEGER,
      references: { model: Order, key: "id" },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: DataTypes.STRING,
    addtime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "Review",
    timestamps: false,
  }
);

Client.hasMany(Review, { foreignKey: "clientid" });
Review.belongsTo(Client, { foreignKey: "clientid" });
Order.hasOne(Review, { foreignKey: "orderid" });
Review.belongsTo(Order, { foreignKey: "orderid" });

module.exports = Review;
