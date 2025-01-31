const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Serie, Pelicula } = require('../models');  

// Endpoint de búsqueda global
router.get('/buscar', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ message: 'Debe proporcionar un término de búsqueda.' });
        }

        // Realizando las consultas a la base de datos
        const series = await Serie.findAll({
            where: {
                [Op.or]: [
                    { NOMBRE_COMPLETO: { [Op.like]: `%${q}%` } },
                    { GENERO: { [Op.like]: `%${q}%` } },
                    { SINOPSIS: { [Op.like]: `%${q}%` } }
                ]
            }
        });

        const peliculas = await Pelicula.findAll({
            where: {
                [Op.or]: [
                    { NOMBRE_COMPLETO: { [Op.like]: `%${q}%` } },
                    { GENERO: { [Op.like]: `%${q}%` } },
                    { SINOPSIS: { [Op.like]: `%${q}%` } }
                ]
            }
        });

        // Debugging: Verifica cuántos resultados se han encontrado
        console.log('Número de series encontradas:', series.length);
        console.log('Número de películas encontradas:', peliculas.length);

        // Si las consultas son exitosas, devuelve los resultados
        res.json({ series, peliculas });

    } catch (error) {
        // Registra los detalles del error para depuración
        console.error('Error al buscar contenido:', error.message);  
        console.error('Error stack:', error.stack); 

        res.status(500).json({ message: 'Error al buscar contenido', error: error.message });
    }
});

module.exports = router;
