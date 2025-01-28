const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../routes/database"); // Asegúrate de importar correctamente la conexión

const Serie = sequelize.define('Serie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    original_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_air_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    origin_country: {
      type: DataTypes.JSON, // Puede venir como un array
      allowNull: true,
    },
    original_language: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    popularity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    vote_average: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    vote_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    genre_ids: {
      type: DataTypes.JSON, // Almacenar como un array de números
      allowNull: true,
    },
    poster_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    backdrop_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adult: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    timestamps: false,
    tableName: 'series',
  });
  
  module.exports = Serie;
