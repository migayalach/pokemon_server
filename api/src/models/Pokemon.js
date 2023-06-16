const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (dataBase) => {
  // defino el modelo
  dataBase.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vida: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ataque: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      defensa: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      velocidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      altura: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      peso: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      creado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
