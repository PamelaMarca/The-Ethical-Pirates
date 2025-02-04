const navegador = document.querySelector('.navegador');
const contenedor_buscador = document.getElementById('buscador');
const barra_busqueda = document.getElementById('search');

//implementa el diseño de las peliculas y series agrupadas
function items(variable, lista){
		const fila = document.createElement('li');
		const url_imagen = variable.URL_POSTER? variable.URL_POSTER : './imagenes/sin_imagen.jpg';
		fila.classList.add('items');
		fila.innerHTML= `
		<div class="info"><p>Nombre: <a href="Items.html?nombre=${variable.NOMBRE_COMPLETO}" class="nombre_item" data-id="${variable.ID_UNICO}"><strong>${variable.NOMBRE_COMPLETO}</strong></a></p>
			<p>Lanzamiento: ${variable.FECHA_ESTRENO}</p>
			<p>Genero: ${variable.GENERO}</p>
			<p>Sinopsis: ${variable.SINOPSIS}</p>
		</div>
		<img class="imagen" src="${url_imagen}" width='170px'>
		` ;

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
function diseño (dato){
	//creando elementos
	const cuadro = document.getElementById('contenido_item');
	const contenedor = document.getElementById('item_informacion');
	const imagen= document.createElement('img');
	imagen.style.maxWidth="350px";
	const datos_serie= document.createElement('div');
	datos_serie.classList.add('datos_items');
	const titulo= document.getElementById('titulo_item');
	const calificacion = document.createElement('p');
	const estreno = document.createElement('p');
	const recomendado_para= document.createElement('p');
	const temporadas = document.createElement('p');
	const duracion = document.createElement('p');
	const generos = document.createElement('p');
	const idioma = document.createElement('p');
	const plataforma = document.createElement('p');
	const cuadro_sinopsis =document.createElement('div');
	cuadro_sinopsis.classList.add('caja_sinopsis');
	
	//compretando con informacion
	imagen.src= dato.URL_POSTER;
	titulo.innerText=dato.NOMBRE_COMPLETO;

	calificacion.innerText= `Calificacion: ${dato.CALIFICACION}`;
	datos_serie.appendChild(calificacion);

	estreno.innerText=`Fecha de estreno: ${dato.FECHA_ESTRENO=='undefine'? dato.FECHA_ESTRENO: "xx-xx-xxxx"}`;
	datos_serie.appendChild(estreno);

	recomendado_para.innerText=`Apto para ${dato.EDAD_RECOMENDADA=='undefine'? dato.EDAD_RECOMENDADA : " todo publico"}`;
	datos_serie.appendChild(recomendado_para);

	if(dato.TOTAL_TEMPORADAS != undefined && dato.TOTAL_TEMPORADAS != null){
		temporadas.innerText= `Cantidad de Temporadas: ${dato.TOTAL_TEMPORADAS=='undefine'? dato.TOTAL_TEMPORADAS: "sin dato"}`;
		datos_serie.appendChild(temporadas);
	}else if(dato.TOTAL_DURACION != undefined){
		duracion.innerText= `Tiempo de duracion: ${dato.TOTAL_DURACION=='undefine'? dato.TOTAL_DURACION: "sin dato"}`;
		datos_serie.appendChild(duracion);
	}
	generos.innerHTML=`Genero: ${dato.GENERO}`;
	idioma.innerHTML=`Idioma original: ${dato.IDIOMA_ORIGINAL}`;
	plataforma.innerHTML=`Plataforma: ${dato.PLATAFORMA=='undefine'? dato.PLATAFORMA: "sin dato"}`;

	cuadro_sinopsis.innerHTML=`<h3>Descripcion</h3>`
	const sinopsis= document.createElement('div');
	sinopsis.classList.add('sinopsis');
	//separo por parrafos la sinopsis
	const parrafos_sinopsis =  [];
	dato.SINOPSIS.split('\n').map(parrafo => {
		const p = document.createElement('p');
		p.innerText=parrafo;
		parrafos_sinopsis.push(p);
	})
	parrafos_sinopsis.forEach(p=> sinopsis.appendChild(p));
	cuadro_sinopsis.appendChild(sinopsis);
	
	datos_serie.appendChild(generos);
	datos_serie.appendChild(idioma);
	datos_serie.appendChild(plataforma);

	contenedor.appendChild(imagen);
	contenedor.appendChild(datos_serie);
	
	cuadro.appendChild(contenedor);
	cuadro.appendChild(cuadro_sinopsis);
}