function agregar_plataforma(){
	const input = document.querySelector('.ingresar_plataforma');
    const nombrePlataforma = input.value.trim();
	if (nombrePlataforma === '') {
        alert('No se ingreso nada');
    }else{
		fetch('http://localhost:3000/api/v1/Plataforma', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				plataforma: nombrePlataforma
			})
		})
		.then(res => res.json())
		.then(json =>{
			if(!json.mensaje){
				alert("Plataforma creada con exito");
				input.value='';
			}
		})
	}
}

function eliminar_plataforma(){
	const input = document.querySelector('.ingresar_plataforma');
    const nombrePlataforma = input.value.trim();
	if (nombrePlataforma === '') {
        alert('No se ingreso nada');
    }else{
		fetch('http://localhost:3000/api/v1/Plataforma/'+ encodeURIComponent(nombrePlataforma), {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		})
		.then(res => res.json())
		.then(json =>{
			if(!json.mensaje){
				alert("Plataforma eliminada con exito. Se borraron tambien peliculas con el nombre de plataforma");
				input.value='';
			}
		})
	}
}