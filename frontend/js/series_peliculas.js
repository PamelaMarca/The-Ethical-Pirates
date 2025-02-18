const navegador = document.querySelector('.navegador');
const contenedor_buscador = document.getElementById('buscador');
const barra_busqueda = document.getElementById('search');

// Implementa el diseño de las películas y series agrupadas
function items(variable, lista) {
    const fila = document.createElement('li');
    const url_imagen = variable.URL_POSTER ? variable.URL_POSTER : './imagenes/sin_imagen.jpg';
    fila.classList.add('items');
    fila.innerHTML = `
        <div class="info">
            <p>Nombre: <a href="Items.html?nombre=${variable.NOMBRE_COMPLETO}" class="nombre_item" data-id="${variable.ID_UNICO}">
                <strong>${variable.NOMBRE_COMPLETO}</strong>
            </a></p>
            <p>Lanzamiento: ${variable.FECHA_ESTRENO}</p>
            <p>Género: ${variable.GENERO}</p>
        </div>
        <img class="imagen" src="${url_imagen}" width='170px'>
    `;
    lista.appendChild(fila);
}

// Función para realizar la búsqueda
function buscar() {
    const valor = barra_busqueda.value.trim();
    const cuadro = document.querySelector('.cuadro');
    let tipo = "todo";

    if (window.location.href.includes("Peliculas")) {
        tipo = "peliculas";
    } else if (window.location.href.includes("Series")) {
        tipo = "series";
    }

    if (valor) {
        fetch(`http://localhost:3000/busqueda/buscar?q=${valor}`)
            .then(respuesta => respuesta.json())
            .then(json => {
                cuadro.innerHTML = `<h2>Resultados</h2>`;

                if (tipo === 'peliculas' || tipo === 'todo') {
                    const PELIS = document.createElement('div');
                    const lista_P = document.createElement('ul');
                    lista_P.classList.add('fichas');

                    PELIS.innerHTML = `<h3 style="margin:10px;">Películas: ${json.peliculas.length}</h3>`;
                    
                    if (json.peliculas.length > 0) {
                        json.peliculas.forEach(pelicula => items(pelicula, lista_P));
                        PELIS.appendChild(lista_P);
                    } else {
                        const parrafo = document.createElement('p');
                        parrafo.style.margin = "10px 20px";
                        parrafo.style.fontSize = "20px";
                        parrafo.innerText = "No se encontraron resultados.";
                        PELIS.appendChild(parrafo);
                    }
                    cuadro.appendChild(PELIS);
                }

                if (tipo === 'series' || tipo === 'todo') {
                    const SERIES = document.createElement('div');
                    const lista_S = document.createElement('ul');
                    lista_S.classList.add('fichas');

                    SERIES.innerHTML = `<h3 style="margin:10px;">Series: ${json.series.length}</h3>`;

                    if (json.series.length > 0) {
                        json.series.forEach(serie => items(serie, lista_S));
                        SERIES.appendChild(lista_S);
                    } else {
                        const parrafo = document.createElement('p');
                        parrafo.style.margin = "10px 20px";
                        parrafo.style.fontSize = "18px";
                        parrafo.innerText = "No se encontraron resultados.";
                        SERIES.appendChild(parrafo);
                    }
                    cuadro.appendChild(SERIES);
                }

                barra_busqueda.value = '';
            })
            .catch(error => {
                console.error("Error en la búsqueda:", error);
                cuadro.innerHTML = "<h2>Hubo un error en la búsqueda</h2>";
            });
    } else {
        cuadro.innerHTML ="<h2>No se ingresó nada</h2>";
    }
}

// Restablecer la posición del buscador en pantallas pequeñas
function posicion_original() {
    if (window.innerWidth < 610) {
        navegador.style.display = "flex";
        barra_busqueda.classList.remove('extendido');
        barra_busqueda.style.display = "none";
        contenedor_buscador.style.width = '';
    }
}

document.getElementById('buscar').addEventListener('click', () => {
    let expandido = barra_busqueda.classList.contains('extendido');

    if (window.innerWidth < 610 && !expandido) {
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


function diseño(dato) {
    console.log("Datos recibidos en diseño():", dato);  // Verifica que los datos tienen el campo LINK

    const cuadro = document.getElementById('contenido_item');
    const contenedor = document.getElementById('item_informacion');
    contenedor.innerHTML = ""; // Limpiar contenido previo

    const imagen = document.createElement('img');
    imagen.style.maxWidth = "300px";
	imagen.style.width="300px";
    imagen.src = dato.URL_POSTER ? dato.URL_POSTER : './imagenes/sin_imagen.jpg';

    const encabezado = document.getElementById('encabezado_item');
    const titulo= document.createElement('h2');
    titulo.classList.add('titulo_item');
    const boton_fav = document.createElement('button');
    boton_fav.id='favorito';
    boton_fav.onclick=()=> a_favorito(dato.ID_UNICO,dato.tipo);
    boton_fav.innerText="Añadir a favoritos";
    titulo.innerText = dato.NOMBRE_COMPLETO;
    encabezado.appendChild(titulo);
    encabezado.appendChild(boton_fav);
    const cuadro_sinopsis = document.createElement('div');
    cuadro_sinopsis.classList.add('caja_sinopsis');
    cuadro_sinopsis.innerHTML = "<h3>Descripción</h3>";

    const sinopsis = document.createElement('div');
    sinopsis.classList.add('sinopsis');
    (dato.SINOPSIS).split('\n').forEach(parrafo => {
        const p = document.createElement('p');
        p.innerText = parrafo;
        sinopsis.appendChild(p);
    });

    cuadro_sinopsis.appendChild(sinopsis);

    const cuadro_datos = document.createElement('div');
    cuadro_datos.classList.add('datos_items');
	const informacion =document.createElement('div');
	informacion.classList.add('cuadro_informacion')

    const calificacion = document.createElement('p');
    calificacion.innerText = `Calificación: ${dato.CALIFICACION}`;
    informacion.appendChild(calificacion);

    const estreno = document.createElement('p');
    estreno.innerText = `Fecha de estreno: ${dato.FECHA_ESTRENO}`;
    informacion.appendChild(estreno);

    const recomendado_para = document.createElement('p');
    recomendado_para.innerText = `Edad Recomendada: ${dato.EDAD_RECOMENDADA}`;
    informacion.appendChild(recomendado_para);

    if (dato.TOTAL_TEMPORADAS !== undefined && dato.TOTAL_TEMPORADAS !== null) {
        const temporadas = document.createElement('p');
        temporadas.innerText = `Cantidad de Temporadas: ${dato.TOTAL_TEMPORADAS}`;
        informacion.appendChild(temporadas);
    } else if (dato.TOTAL_DURACION !== undefined) {
        const duracion = document.createElement('p');
        duracion.innerText = `Tiempo de duración: ${dato.TOTAL_DURACION}`;
        informacion.appendChild(duracion);
    }

    const generos = document.createElement('p');
    generos.innerText = `Género: ${dato.GENERO}`;
    informacion.appendChild(generos);

    const idioma = document.createElement('p');
    idioma.innerText = `Idioma original: ${dato.IDIOMA_ORIGINAL}`;
    informacion.appendChild(idioma);

    const plataforma = document.createElement('p');
    plataforma.innerHTML = `Plataforma: <span id="plataforma">${dato.PLATAFORMA}</span>`;
    informacion.appendChild(plataforma);

    // Verifica si el valor de LINK está presente antes de crear el botón
    const boton_plataforma = document.createElement('a');
    boton_plataforma.classList.add('boton-plataforma');
    
    if (dato.LINK && dato.LINK !== '') {  // Verifica si LINK no es vacío o nulo
        boton_plataforma.innerText = `Ver en ${dato.PLATAFORMA}`;
        boton_plataforma.href = dato.LINK;
    } else {
        boton_plataforma.innerText = "Enlace no disponible";
        boton_plataforma.href = '#'; // No hay enlace disponible
    }
	informacion.appendChild(boton_plataforma);

    // Añadir el botón debajo de la plataforma

	cuadro_datos.appendChild(informacion); // Se añade debajo de la sinopsis
    cuadro_datos.appendChild(cuadro_sinopsis);

    contenedor.appendChild(imagen);
    cuadro.appendChild(contenedor);
	cuadro.appendChild(cuadro_datos);
}
