module.exports = (sequelize, DataTypes) => {
    const Favoritos = sequelize.define('Favoritos', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
		id_usuario: {
			type: DataTypes.INTEGER,
		},
		contenido: {
			type: DataTypes.STRING,
		},
		id_contenido: {
			type: DataTypes.INTEGER,
		}

	}, {
        tableName: 'favoritos',
        timestamps: false
    });

    return Favoritos;
};