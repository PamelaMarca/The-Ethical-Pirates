function enviar_comentario(item){
	const texto= document.getElementById('barra_comentar');
	let user = localStorage.getItem('id_user');
	if(!user)
		user=0; //voy a usar el 0 para establecer como usuario invitado
	fetch('http://localhost:3000/api/v1/comentar', {
		method:'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body:JSON.stringify({
			ID_PERSONA: user,
			COMENTARIO: texto.value,
			NOMBRE_ITEM: item
		})
	})
	.then(res=>res.json())
	.then(json =>{
		alert('El comentario se envio con exito');
	})
}

async function cargar_comentarios(dato){
	const lista = document.getElementById('lista_comentarios');
	fetch('http://localhost:3000/api/v1/comentarios/'+ encodeURIComponent(dato.NOMBRE_COMPLETO))
	.then( res => res.json())
	.then( json => {
		if(!json.mensaje){
			json.forEach(element => {
				const cuadrito_comentarios= document.createElement('div');
				cuadrito_comentarios.classList.add('comentario_individual');
				const nombre = document.createElement('h4');
				nombre.innerHTML= element.nombre_usuario;
				cuadrito_comentarios.appendChild(nombre);

				const comentario = document.createElement('div');
				comentario.classList.add('text_comentario');
				(element.comentario).split('\n').forEach(parrafo => {
					const p = document.createElement('p');
					p.innerText = parrafo;
					comentario.appendChild(p);
				});

				cuadrito_comentarios.appendChild(comentario);
				lista.appendChild(cuadrito_comentarios);
			});

		}else{
			lista.innerHTML=`<div><h4 class="sin_comentarios">${json.mensaje}</h4></div>`
		}
	})

}

function diseño_comentarios(dato){
	const cuadro = document.getElementById('cuadro');
	const comentarios = document.createElement('div');
    comentarios.classList.add('comentarios');

	const titulo_comentarios = document.createElement('h3');
    titulo_comentarios.innerText = 'Deja un comentario';
    comentarios.appendChild(titulo_comentarios);
	
    const comentar = document.createElement('section');
    comentar.classList.add('cuadro_ingreso_comentario');
    const barra_comentar = document.createElement('textarea');
    barra_comentar.id = 'barra_comentar';
    barra_comentar.placeholder = 'Escribe tu opinión';
    comentar.appendChild(barra_comentar);    
    const boton_comentar = document.createElement('button');
    boton_comentar.id = 'boton_comentar';
    boton_comentar.innerText = 'Comentar';
    boton_comentar.onclick=() => enviar_comentario(dato.NOMBRE_COMPLETO);
    comentar.appendChild(boton_comentar);

	comentarios.appendChild(comentar);

	const mostrando_comentarios= document.createElement('div');
	mostrando_comentarios.classList.add('cuadro_de_comentarios');
	const subtitulo_comentarios = document.createElement('h3');
    subtitulo_comentarios.innerText = 'Comentarios';
	mostrando_comentarios.appendChild(subtitulo_comentarios);

    const listaComentarios = document.createElement('div');
    listaComentarios.id = 'lista_comentarios';
    mostrando_comentarios.appendChild(listaComentarios);

	comentarios.appendChild(mostrando_comentarios);

	cuadro.appendChild(comentarios);
	cargar_comentarios(dato);
}


