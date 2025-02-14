module.exports = (sequelize, DataTypes) => {
    const Favoritos = sequelize.define('Favoritos', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuarios',
                key: 'id'
            },
            onDelete:'CASCADE'
        },
        contenido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_contenido: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'favoritos',
        timestamps: false
    });

    // Definir la relación
	Favoritos.associate = (models) => {
		Favoritos.belongsTo(models.Usuario, {
			foreignKey: 'id_usuario',
            as: 'usuario',
			onDelete: 'CASCADE'
		});
        Favoritos.belongsTo(models.Pelicula, {
            foreignKey: 'id_contenido',
            as: 'pelicula',
            constraints: false
        });
      
        Favoritos.belongsTo(models.Serie, {
            foreignKey: 'id_contenido',
            as: 'serie',
            constraints: false
        });
	};
	
    return Favoritos;
};