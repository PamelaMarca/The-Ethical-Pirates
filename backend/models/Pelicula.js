module.exports = (sequelize, DataTypes) => {
    const Pelicula = sequelize.define('Pelicula', {
        ID_UNICO: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        NOMBRE_COMPLETO: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FECHA_ESTRENO: {
            type: DataTypes.DATE
        },
        TOTAL_DURACION: {
            type: DataTypes.INTEGER
        },
        GENERO: {
            type: DataTypes.STRING
        },
        IDIOMA_ORIGINAL: {
            type: DataTypes.STRING
        },
        EDAD_RECOMENDADA: {
            type: DataTypes.STRING
        },
        SINOPSIS: {
            type: DataTypes.TEXT
        },
        CALIFICACION: {
            type: DataTypes.FLOAT
        },
        PLATAFORMA: {
            type: DataTypes.STRING
        },
        URL_POSTER: {
            type: DataTypes.STRING
        },
        ACCESO: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'peliculas',
        timestamps: false
    });

    return Pelicula;
};
