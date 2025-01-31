document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const contenedor_resultados = document.getElementById('resultados');

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value.trim();

        if (query.length === 0) {
            contenedor_resultados.innerHTML = ''; // Borra resultados si no hay búsqueda
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/busqueda/buscar?q=${query}`);
            const data = await response.json();

            contenedor_resultados.innerHTML = ''; // Limpiar resultados previos

            if (data.series.length === 0 && data.peliculas.length === 0) {
                contenedor_resultados.innerHTML = '<p>No se encontraron resultados</p>';
                return;
            }

            if (data.series.length > 0) {
                const seriesSection = document.createElement('div');
                seriesSection.innerHTML = '<h2>Series</h2>';
                data.series.forEach(serie => {
                    const serieElement = document.createElement('div');
                    serieElement.innerHTML = `
                        <h3>${serie.NOMBRE_COMPLETO}</h3>
                        <p><strong>Género:</strong> ${serie.GENERO}</p>
                        <p><strong>Sinopsis:</strong> ${serie.SINOPSIS}</p>
                        <hr>
                    `;
                    seriesSection.appendChild(serieElement);
                });
                contenedor_resultados.appendChild(seriesSection);
            }

            if (data.peliculas.length > 0) {
                const peliculasSection = document.createElement('div');
                peliculasSection.innerHTML = '<h2>Películas</h2>';
                data.peliculas.forEach(pelicula => {
                    const peliculaElement = document.createElement('div');
                    peliculaElement.innerHTML = `
                        <h3>${pelicula.NOMBRE_COMPLETO}</h3>
                        <p><strong>Género:</strong> ${pelicula.GENERO}</p>
                        <p><strong>Sinopsis:</strong> ${pelicula.SINOPSIS}</p>
                        <hr>
                    `;
                    peliculasSection.appendChild(peliculaElement);
                });
                contenedor_resultados.appendChild(peliculasSection);
            }
        } catch (error) {
            console.error('Error al buscar contenido:', error);
        }
    });
});