const fetch = require("node-fetch"); // Importa fetch para solicitudes HTTP

const apiBaseUrl = "https://api.themoviedb.org/3"; // URL base de la API
const apiKey = "e59f9fc15c5a6bb42456e6c338acaabb"; // Clave de la API

async function fetchData(query) {
    const url = `${apiBaseUrl}/search/movie?query=${encodeURIComponent(query)}&api_key=${apiKey}`; // Construye la URL correcta
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "accept": "application/json", // Especificamos que aceptamos JSON
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json(); // Devuelve la respuesta en formato JSON
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        throw error;
    }
}

module.exports = { fetchData };
