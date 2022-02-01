const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  displayName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  totalScoreForAllGames: { type: DataTypes.INTEGER },
});

module.exports = {
  User,
};
