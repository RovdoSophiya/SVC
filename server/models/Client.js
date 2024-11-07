const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class Client extends Model {}

Client.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lastname: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    fathername: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: { type: DataTypes.STRING, unique: true, allowNull: false },
    address: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Client",
    tableName: "Client",
    timestamps: false,
  }
);

module.exports = Client;
