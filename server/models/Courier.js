const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class Courier extends Model {}

Courier.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lastname: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    fathername: DataTypes.STRING,
    phone: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    vehicletype: { type: DataTypes.STRING, allowNull: false },
    available: { type: DataTypes.BOOLEAN, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Courier",
    tableName: "Courier",
    timestamps: false,
  }
);

module.exports = Courier;
