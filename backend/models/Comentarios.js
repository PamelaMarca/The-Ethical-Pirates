module.exports = (sequelize, DataTypes) => {
    const Comentarios = sequelize.define('Comentarios', {
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
            onDelete: 'CASCADE'
        },
        comentario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre_item: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'comentarios',
        timestamps: false
    });

    // Definir la relación
	Comentarios.associate = (models) => {
		Comentarios.belongsTo(models.Usuario, {
			foreignKey: 'id_usuario',
            as: 'usuario',
			onDelete: 'CASCADE'
		});
        Comentarios.belongsTo(models.Pelicula, {
            foreignKey: 'nombre_item',
            as: 'pelicula',
            constraints: false
        });
      
        Comentarios.belongsTo(models.Serie, {
            foreignKey: 'nombre_item',
            as: 'serie',
            constraints: false
        });
	};
	
    return Comentarios;
};