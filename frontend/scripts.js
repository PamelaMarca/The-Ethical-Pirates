document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const resultsContainer = document.getElementById('results');

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value.trim();

        if (query.length === 0) {
            resultsContainer.innerHTML = ''; // Borra resultados si no hay búsqueda
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/busqueda/buscar?q=${query}`);
            const data = await response.json();

            resultsContainer.innerHTML = ''; // Limpiar resultados previos

            if (data.series.length === 0 && data.peliculas.length === 0) {
                resultsContainer.innerHTML = '<p>No se encontraron resultados</p>';
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
                resultsContainer.appendChild(seriesSection);
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
                resultsContainer.appendChild(peliculasSection);
            }
        } catch (error) {
            console.error('Error al buscar contenido:', error);
        }
    });
});
