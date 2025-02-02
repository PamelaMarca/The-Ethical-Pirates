function items(variable, lista){
		const fila = document.createElement('li');
		const url_imagen = variable.URL_POSTER? variable.URL_POSTER : './imagenes/sin_imagen.jpg';
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