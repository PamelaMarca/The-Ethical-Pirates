const sequelize = require("../routes/database"); // Importación corregida
const { DataTypes } = require("sequelize");

const Link = sequelize.define("Link", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    proveedor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING, // Puede ser 'streaming', 'compra', 'alquiler', etc.
        allowNull: false,
    },
});

module.exports = Link;
