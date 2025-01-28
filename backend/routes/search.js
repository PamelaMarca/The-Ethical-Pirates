const express = require('express');
const { Movie } = require('../models/movie');

const router = express.Router();

router.get('/', async (req, res) => {
    const query = req.query.query;
    try {
        const movies = await Movie.findAll({
            where: {
                title: {
                    [Sequelize.Op.like]: `%${query}%`
                }
            }
        });
        res.json({ results: movies });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener películas' });
    }
});

module.exports = router;
