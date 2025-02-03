const navegador = document.querySelector('.navegador');
const contenedor_buscador = document.getElementById('buscador');
const barra_busqueda = document.getElementById('search');

function items(variable, lista){
		const fila = document.createElement('li');
		const url_imagen = variable.URL_POSTER? variable.URL_POSTER : '../imagenes/sin_imagen.jpg';
		fila.classList.add('items');
		fila.innerHTML= `
		<div class="info"><p>Nombre: <strong>${variable.NOMBRE_COMPLETO}</strong></p>
			<p>Lanzamiento: ${variable.FECHA_ESTRENO}</p>
			<p>Genero: ${variable.GENERO}</p>
			<p>Sinopsis: ${variable.SINOPSIS}</p>
		</div>
		<img class="imagen" src="${url_imagen}" width='170px'>
		` ;

		lista.appendChild(fila);
}

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

document.getElementById('buscar').addEventListener('click',()=>{
	let expandido = barra_busqueda.classList.contains('extendido');
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