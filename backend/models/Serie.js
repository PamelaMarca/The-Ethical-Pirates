module.exports = (sequelize, DataTypes) => {
  const Serie = sequelize.define('Serie', {
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
      TOTAL_TEMPORADAS: {
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
      },
      LINK: {
        type: DataTypes.STRING
    }
  }, {
      tableName: 'series',
      timestamps: false
  });
  Serie.associate = (models) => {
    Serie.hasMany(models.Favoritos, {
      foreignKey: 'id_contenido',
      as: 'favoritos'
    });
  };
  Serie.associate = (models) => {
    Serie.hasMany(models.Comentarios, {
      foreignKey: 'nombre_item',
      as: 'comentarios'
    });
  };

  return Serie;
};
