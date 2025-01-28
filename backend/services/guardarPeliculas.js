const axios = require('axios');
const sequelize = require("../routes/database"); // Ajusta la ruta según tu estructura
const Pelicula = require('../models/Pelicula'); // Asegúrate de que el nombre coincide exactamente con el archivo

async function fetchData(query) {
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTlmOWZjMTVjNWE2YmI0MjQ1NmU2YzMzOGFjYWFiYiIsIm5iZiI6MTczMzE4MjM4OS43MTEsInN1YiI6IjY3NGU0M2I1MmNlNGNlN2RkNjA5NDkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EZf_3QzGRgB9I2bnSMP88bpet-g3MwV83QJsPqNwc9Q'; // Reemplaza con tu API Key
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;
    
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                accept: 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al hacer la solicitud a la API:', error);
        throw error;
    }
}

async function guardarPeliculasDesdeAPI(query) {
    try {
        console.log('Iniciando la ejecución para guardar las películas...');
        
        const data = await fetchData(query);

        console.log('Datos recibidos de la API:', data);

        const peliculas = data.results;

        if (!peliculas || peliculas.length === 0) {
            console.log('No se encontraron películas para guardar.');
            return;
        }

        for (let pelicula of peliculas) {
            console.log(`Guardando película: ${pelicula.title}`);

            await Pelicula.create({
                id: pelicula.id,
                titulo: pelicula.title,
                descripcion: pelicula.overview,
                anio: pelicula.release_date ? new Date(pelicula.release_date).getFullYear() : null,
                backdrop_path: pelicula.backdrop_path,
                poster_path: pelicula.poster_path,
                release_date: pelicula.release_date ? new Date(pelicula.release_date) : null,
                vote_average: pelicula.vote_average,
                vote_count: pelicula.vote_count,
            });

            console.log(`Película ${pelicula.title} guardada con éxito.`);
        }

        console.log("Todas las películas han sido guardadas.");
    } catch (error) {
        console.error("Error al guardar las películas:", error);
    }
}

// Función para ejecutar el script, pasando el título de la película que deseas buscar
const tituloDePelicula = "barbie";  // Cambia este valor por cualquier película que desees buscar
sequelize.sync()
    .then(() => {
        console.log("Base de datos sincronizada");
        guardarPeliculasDesdeAPI(tituloDePelicula);  // Aquí se pasa el título dinámicamente
    })
    .catch(err => console.error("Error al sincronizar la base de datos:", err));
