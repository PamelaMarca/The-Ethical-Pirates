
// models/pelicula.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../routes/database');  // Importa la instancia de tu base de datos

class Pelicula extends Model {}

Pelicula.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    anio: {
        type: DataTypes.INTEGER
    },
    backdrop_path: {
        type: DataTypes.STRING
    },
    poster_path: {
        type: DataTypes.STRING
    },
    release_date: {
        type: DataTypes.DATE
    },
    vote_average: {
        type: DataTypes.FLOAT
    },
    vote_count: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Pelicula'
});

module.exports = Pelicula;
