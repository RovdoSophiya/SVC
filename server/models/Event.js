const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Client = require("./Client");

class Event extends Model {}

Event.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clientid: {
      type: DataTypes.INTEGER,
      references: { model: Client, key: "id" },
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    message: DataTypes.TEXT,
    phone: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Event",
    tableName: "Event",
    timestamps: false,
  }
);

Client.hasMany(Event, { foreignKey: "clientid" });
Event.belongsTo(Client, { foreignKey: "clientid" });

module.exports = Event;
