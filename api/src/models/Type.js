const { DataTypes } = require("sequelize");
module.exports = (dataBase) => {
  dataBase.define(
    "type",
    {
      id: {
        type: DataTypes.INTEGER,
        uautoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
