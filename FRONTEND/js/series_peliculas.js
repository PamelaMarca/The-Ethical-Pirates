async function items(variable, lista){
		const fila = document.createElement('li');
		fila.classList.add('items');
		fila.innerHTML= `
		<div class="info"><p>Nombre: <strong>${variable.nombre}</strong></p>
			<p>Lanzamiento: ${variable.fecha_de_lanzamiento}</p>
			<p>Genero: ${variable.genero}</p>
			<p>Sinopsis: ${variable.sinopsis}</p>
		</div>
		<img class="imagen" src="${variable.portada}" width='170px'>
		` ;
		lista.appendChild(fila);
}