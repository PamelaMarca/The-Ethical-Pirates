function insertar_fav(id, tipo, contenido, token){
	fetch('http://localhost:3000/api/v1/Favorito',{
		method:"POST",
		headers:{
			'Authorization':'Bearer ' + token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			ID_USUARIO:id,
			CONTENIDO: tipo,
			ID_CONTENIDO: contenido,
		})
	})
	.then(res => res.json())
	.then(fav =>{
		if(fav.mensaje){
			alert(fav.mensaje);
		}
		const boton = document.getElementById('favorito');
		boton.innerText= "Añadido a favoritos";
	})
}

function a_favorito(id_contenido, tipo){
	const token = localStorage.getItem("token");
	if(token){
		let id = localStorage.getItem("id_user");
		insertar_fav(id, tipo, id_contenido, token);
	}else{
		alert("El usuario debe ingresar para añadir a favorito");
	}

}
