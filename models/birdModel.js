const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Bird = sequelize.define("bird", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  species: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  audio: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  Bird,
};
