const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "temperament",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
