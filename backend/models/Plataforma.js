module.exports = (sequelize, DataTypes) => {
    const Plataforma = sequelize.define('Plataforma', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        plataforma: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'plataformas',
        timestamps: false
    });

    // Definir la relación
	Plataforma.associate = (models) => {
        Plataforma.belongsTo(models.Serie, {
            foreignKey: 'plataforma',
            as: 'serie',
            onDelete: 'CASCADE'
        });
        Plataforma.belongsTo(models.Pelicula, {
            foreignKey: 'plataforma',
            as: 'pelicula',
            onDelete: 'CASCADE'
        });

	};

    return Plataforma;
};