const navegador = document.querySelector('.navegador');
const contenedor_buscador = document.getElementById('buscador');
const barra_busqueda = document.getElementById('search');

let timeoutBusqueda; // Variable para el temporizador

// Detectar la entrada en la barra de búsqueda con retraso
barra_busqueda.addEventListener('input', () => {
    clearTimeout(timeoutBusqueda); // Borra el temporizador anterior
    timeoutBusqueda = setTimeout(buscar, 500); // Espera 500ms antes de ejecutar la búsqueda
});

function items(variable, lista) {
    const fila = document.createElement('li');
    const url_imagen = variable.URL_POSTER ? variable.URL_POSTER : './imagenes/sin_imagen.jpg';

    const esSerie = variable.TOTAL_TEMPORADAS !== undefined;
    const duracion_o_temporadas = esSerie
        ? `<p><strong>Temporadas:</strong> ${variable.TOTAL_TEMPORADAS}</p>` 
        : `<p><strong>Duración:</strong> ${variable.TOTAL_DURACION ? variable.TOTAL_DURACION + " min" : "No disponible"}</p>`;

    fila.classList.add('items');
    fila.innerHTML = `
        <div class="info">
            <p><strong>Nombre:</strong> ${variable.NOMBRE_COMPLETO}</p>
            <p><strong>Lanzamiento:</strong> ${variable.FECHA_ESTRENO}</p>
            <p><strong>Género:</strong> ${variable.GENERO}</p>
            <p><strong>Sinopsis:</strong> ${variable.SINOPSIS}</p>
            <p><strong>Idioma Original:</strong> ${variable.IDIOMA_ORIGINAL}</p>
            <p><strong>Edad Recomendada:</strong> ${variable.EDAD_RECOMENDADA ? variable.EDAD_RECOMENDADA : "Todo público"}</p>
            <p><strong>Calificación:</strong> ${variable.CALIFICACION}</p>
            <p><strong>Plataforma:</strong> ${variable.PLATAFORMA ? variable.PLATAFORMA : "No disponible"}</p>
            ${duracion_o_temporadas}
        </div>
        <img class="imagen" src="${url_imagen}" width='170px'>
    `;

    lista.appendChild(fila);
}

function buscar() {
    const valor = barra_busqueda.value.trim();
    const cuadro = document.querySelector('.cuadro');

    if (!valor) {
        cuadro.innerHTML = `<h2>No se ingresó nada</h2>`;
        return;
    }

    fetch(`http://localhost:3000/busqueda/buscar?q=${valor}`)
        .then(respuesta => respuesta.json())
        .then(json => {
            cuadro.innerHTML = `<h2>Resultados</h2>`;
            const PELIS = document.createElement('div');
            const SERIES = document.createElement('div');
            const lista_P = document.createElement('ul');
            const lista_S = document.createElement('ul');
            lista_P.classList.add('fichas');
            lista_S.classList.add('fichas');

            PELIS.innerHTML = `<h3 style="margin:10px;">Películas: ${json.peliculas.length}</h3>`;
            SERIES.innerHTML = `<h3 style="margin:10px;">Series: ${json.series.length}</h3>`;

            if (json.peliculas.length > 0) {
                json.peliculas.forEach(pelicula => items(pelicula, lista_P));
                PELIS.appendChild(lista_P);
            } else {
                PELIS.appendChild(crearMensaje("No se encontraron resultados."));
            }

            if (json.series.length > 0) {
                json.series.forEach(serie => items(serie, lista_S));
                SERIES.appendChild(lista_S);
            } else {
                SERIES.appendChild(crearMensaje("No se encontraron resultados."));
            }

            cuadro.appendChild(PELIS);
            cuadro.appendChild(SERIES);
        })
        .catch(() => {
            cuadro.innerHTML = `<p>Error al realizar la búsqueda.</p>`;
        });
}

function crearMensaje(texto) {
    const parrafo = document.createElement('p');
    parrafo.style.margin = "10px 20px";
    parrafo.style.fontSize = "18px";
    parrafo.innerText = texto;
    return parrafo;
}

function posicion_original() {
    if (window.innerWidth < 470) {
        navegador.style.display = "flex";
        barra_busqueda.classList.remove('extendido');
        barra_busqueda.style.display = "none";
        contenedor_buscador.style.width = '';
    }
}

document.getElementById('buscar').addEventListener('click', () => {
    let expandido = barra_busqueda.classList.contains('extendido');

    if (window.innerWidth < 470 && !expandido) {
        barra_busqueda.classList.add('extendido');
        navegador.style.display = "block";
        barra_busqueda.style.display = "block";
        contenedor_buscador.style.width = '100%';
        barra_busqueda.focus();
    } else {
        buscar();
        posicion_original();
    }
});

document.getElementById('search').addEventListener('blur', posicion_original);
