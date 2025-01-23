const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:password@localhost:5432/database');

const Movie = sequelize.define('Movie', {
    title: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING },
    platform: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
});

sequelize.sync().then(() => console.log('Base de datos sincronizada.'));

