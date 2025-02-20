const { Sequelize } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),  // Ruta al archivo SQLite
    define:{
        timestamps:false
    },
    logging:false
});

// Importa los modelos
const Pelicula = require('./Pelicula')(sequelize, Sequelize.DataTypes);  
const Serie = require('./Serie')(sequelize, Sequelize.DataTypes);  
const Usuario = require('./Usuario')(sequelize, Sequelize.DataTypes);
const Favoritos = require('./Favoritos')(sequelize, Sequelize.DataTypes);
const Comentarios = require('./Comentarios')(sequelize, Sequelize.DataTypes);
const Plataforma = require('./Plataforma')(sequelize, Sequelize.DataTypes);

const moldes = {
    Pelicula,
    Serie,
    Usuario,
    Favoritos,
    Comentarios,
    Plataforma
};

// Configura las asociaciones
Object.keys(moldes).forEach(modelName => {
    if (moldes[modelName].associate) {
        moldes[modelName].associate(moldes);
    }
});

// Exporta la conexión y los modelos
module.exports = {
    sequelize,
    ...moldes
};
