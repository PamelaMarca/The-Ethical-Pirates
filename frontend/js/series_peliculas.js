const navegador = document.querySelector('.navegador');
const contenedor_buscador = document.getElementById('buscador');
const barra_busqueda = document.getElementById('search');

function items(variable, lista) {
    const fila = document.createElement('li');
    const url_imagen = variable.URL_POSTER ? variable.URL_POSTER : './imagenes/sin_imagen.jpg';

    // Determinar si es película o serie y asignar la duración adecuada
    const esSerie = variable.TOTAL_TEMPORADAS !== undefined; // Si tiene temporadas, es serie
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
            ${duracion_o_temporadas} <!-- Aquí se muestra Temporadas o Duración según corresponda -->
        </div>
        <img class="imagen" src="${url_imagen}" width='170px'>
    `;

    lista.appendChild(fila);
}

// la funcion para recibir la palabra y buscar de ella
function buscar(){
	const valor = document.getElementById('search').value;
	const cuadro= document.querySelector('.cuadro');

	if (valor){
		fetch(`http://localhost:3000/busqueda/buscar?q=${valor}`)
		.then(respuesta => respuesta.json())
		.then(json =>{
			console.log(json.peliculas);
			cuadro.innerHTML =`<h2>Resultados</h2>`;
			const PELIS = document.createElement('div');
			const SERIES = document.createElement('div');
			const lista_P = document.createElement('ul');
			const lista_S = document.createElement('ul');
			lista_P.classList.add('fichas');
			lista_S.classList.add('fichas');
			PELIS.innerHTML= `<h3 style="margin:10px;">Películas: ${json.peliculas.length}</h3>`;
			SERIES.innerHTML= `<h3 style="margin:10px;">Series: ${json.series.length}</h3>`;
			if(json.peliculas.length > 0){
				json.peliculas.forEach(pelicula =>{
					items(pelicula,lista_P);
				});
				PELIS.appendChild(lista_P)
			}else {
				parrafo = document.createElement('p');
				parrafo.style.margin= "10px 20px"
				parrafo.style.fontSize="20px"
				parrafo.innerText= "No se encontraron resultados."
				PELIS.appendChild(parrafo)
			}
			
			if (json.series.length >0){
				json.series.forEach(serie =>{
					items(serie, lista_S);
				})
				SERIES.appendChild(lista_S)
			}else{
				parrafo = document.createElement('p');
				parrafo.style.margin= "10px 20px"
				parrafo.style.fontSize="18px"
				parrafo.innerText= "No se encontraron resultados."
				SERIES.appendChild(parrafo)
			}

			cuadro.appendChild(PELIS);
			cuadro.appendChild(SERIES);
			document.getElementById('search').value = ''
		})
		.catch(error=>{
			cuadro.innerHTML=`Hubo un error en la busqueda`;
		})      
	}else{
		cuadro.innerHTML=`<h2>No se ingreso nada</h2>`
	}

}

function posicion_original(){
	if(window.innerWidth < 470){
		navegador.style.display="flex";
		barra_busqueda.classList.remove('extendido');
		barra_busqueda.style.display = "none";
		contenedor_buscador.style.width ='';
	}
}

// cuando apretemos la lupita
document.getElementById('buscar').addEventListener('click',()=>{
	let expandido = barra_busqueda.classList.contains('extendido');
	//para dispositivos que sean pequeños el input se extendera
	if(window.innerWidth < 470 && !expandido){
		barra_busqueda.classList.add('extendido');
		navegador.style.display ="block"
		barra_busqueda.style.display = "block";
		contenedor_buscador.style.width ='100%';
		barra_busqueda.focus();
	}else{
		buscar();
		posicion_original();
	}
})

//cuando se hace lick en otro elemento el input vuelve a posiscion original
document.getElementById('search').addEventListener('blur', posicion_original);


//pagina individual
function diseño (dato, tipo){
	const contenedor = document.getElementById('item_informacion');
            const imagen= document.createElement('img');
            imagen.style.maxWidth="350px";
            const datos_serie= document.createElement('div');
            datos_serie.classList.add('datos_items');
            const titulo= document.createElement('h2');
            const calificacion = document.createElement('p');
            const estreno = document.createElement('p');
            const recomendado_para= document.createElement('p');
            const temporadas = document.createElement('p');
            const generos = document.createElement('p');
            const idioma = document.createElement('p');
            const plataforma = document.createElement('p');
			const cuadro_sinopsis =document.createElement('div');
			
            //compretando con informacion
            imagen.src= dato.URL_POSTER;
            titulo.innerText=dato.NOMBRE_COMPLETO;
            calificacion.innerText= `Calificacion: ${dato.CALIFICACION}`;
            estreno.innerText=`Fecha de estreno: ${dato.FECHA_ESTRENO}`;
            recomendado_para.innerText=`Apto para ${dato.EDAD_RECOMENDADA? dato.EDAD_RECOMENDADA : " todo publico"}`;
            temporadas.innerText= `Cantidad de Temporadas: ${dato.TOTAL_TEMPORADAS}`;
            generos.innerHTML=`Genero: ${dato.GENERO}`;
            //insertandolos
			
            datos_serie.appendChild(calificacion);
            datos_serie.appendChild(estreno);
            datos_serie.appendChild(recomendado_para);
            datos_serie.appendChild(temporadas);
            datos_serie.appendChild(generos);

            contenedor.appendChild(titulo);
            contenedor.appendChild(imagen);
            contenedor.appendChild(datos_serie);
}
