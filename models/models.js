const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  displayName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  totalScoreForAllGames: { type: DataTypes.INTEGER },
});

const Bird = sequelize.define("bird", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  species: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  audio: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  User,
  Bird,
};
