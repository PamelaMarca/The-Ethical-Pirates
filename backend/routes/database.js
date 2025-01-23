const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite" // Nombre del archivo SQLite
});

sequelize.sync()
    .then(() => console.log("Base de datos sincronizada"))
    .catch(err => console.error("Error al sincronizar la base de datos:", err));

module.exports = sequelize;

