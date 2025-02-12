const { Sequelize } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite')  // Ruta al archivo SQLite
});

// Importa los modelos
const Pelicula = require('./Pelicula')(sequelize, Sequelize.DataTypes);  
const Serie = require('./Serie')(sequelize, Sequelize.DataTypes);  
const Usuario = require('./Usuario')(sequelize, Sequelize.DataTypes);

// Exporta la conexión y los modelos
module.exports = {
    sequelize,
    Usuario,
    Pelicula,
    Serie,
  };
