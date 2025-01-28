const express = require("express");
const router = express.Router();

// Ruta para la búsqueda de películas
router.get("/buscar", async (req, res) => {
    const query = req.query.query; // Obtener el parámetro de búsqueda
    if (!query) {
        return res.status(400).json({ error: "Debe proporcionar un término de búsqueda." });
    }

    try {
        // Aquí deberías hacer la lógica para obtener los datos, por ejemplo, desde una base de datos
        // Este es un ejemplo de datos simulados
        const resultados = [
            { nombre: "Breaking Bad", plataforma: "Netflix" },
            { nombre: "Sherlock", plataforma: "Amazon Prime" }
        ];

        // Filtramos los resultados por el término de búsqueda
        const resultadosFiltrados = resultados.filter(pelicula => 
            pelicula.nombre.toLowerCase().includes(query.toLowerCase())
        );

        res.json(resultadosFiltrados); // Enviar los resultados como respuesta
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        res.status(500).json({ error: "Hubo un error al realizar la búsqueda." });
    }
});

module.exports = router;
