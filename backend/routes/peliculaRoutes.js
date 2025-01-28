const express = require("express");
const router = express.Router();
const Pelicula = require("../models/Pelicula"); // Asegúrate de importar el modelo correctamente

// Obtener todas las películas
router.get("/", async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll();
        res.json(peliculas);
    } catch (error) {
        console.error("Error al obtener las películas:", error);
        res.status(500).json({ message: "Error al obtener las películas" });
    }
});

module.exports = router;
