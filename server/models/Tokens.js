const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Client = require("./Client");
const Courier = require("./Courier");

class Tokens extends Model {}

Tokens.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Client",
        key: "id",
      },
    },
    courierid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Courier",
        key: "id",
      },
    },
    accesstoken: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    refreshtoken: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    expiresat: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Tokens",
    tableName: "Tokens",
    timestamps: false, // Чтобы не создавать автоматические поля createdAt и updatedAt
  }
);

// Триггер для обновления updatedat
Tokens.beforeUpdate((token) => {
  token.updatedat = new Date();
});

Client.hasOne(Tokens, { foreignKey: "clientid" });
Tokens.belongsTo(Client, { foreignKey: "clientid" });
Courier.hasOne(Tokens, { foreignKey: "courierid" });
Tokens.belongsTo(Courier, { foreignKey: "courierid" });

module.exports = Tokens;
