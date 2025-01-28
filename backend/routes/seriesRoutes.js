const express = require("express");
const router = express.Router();
const Serie = require("../models/Serie"); // Asegúrate de importar el modelo correctamente

// Obtener todas las series
router.get("/", async (req, res) => {
    try {
        const series = await Serie.findAll();
        res.json(series);
    } catch (error) {
        // Mostrar detalles del error en la consola
        console.error("Error al obtener las series:", error.message);
        console.error(error); // Muestra el error completo
        res.status(500).json({
            message: "Error al obtener las series",
            error: error.message, // Retorna el mensaje de error para obtener más detalles
        });
    }
});

module.exports = router;
