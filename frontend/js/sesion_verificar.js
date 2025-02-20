function iniciado(){
	let navegador=document.getElementById('navegador_interno');
	const boton_registro=document.getElementById('ingresar');
	const index = document.getElementById('index');
	navegador.style.visibility = 'visible';
	boton_registro.style.display = 'none';
	index.style.display= 'none';
}

function sesion_cerrada() {
	let navegador=document.getElementById('navegador_interno');
	const boton_registro=document.getElementById('ingresar');
	const index = document.getElementById('index');
	navegador.style.visibility = 'hidden';
	boton_registro.style.display = 'block';
	index.style.display= 'block';
	localStorage.removeItem('token');
	localStorage.removeItem('nombre');
	localStorage.removeItem('id_user');
}

function verificar_sesion(){
	const token = localStorage.getItem("token");
	if(!token){ 
		sesion_cerrada();
	}else{
		iniciado();
	}
}

document.addEventListener('DOMContentLoaded',()=>{
	const perfil = document.getElementById('perfil_usuario');
	const boton_cerrar = document.getElementById('cerrar_sesion');
	if(perfil){
		perfil.addEventListener('click', ()=>{
			const token_nombre = localStorage.getItem("nombre");
			window.location.href= `perfil.html?cuenta=${token_nombre}`
		})
	}
	else{
		console.log("Perfil no encontrado");
	}
	if(boton_cerrar){
		boton_cerrar.addEventListener('click',()=>{
			sesion_cerrada();
			window.location.href='inicio_registro.html';
		})
	}else{
		console.log("Nn se pudo cerrar sesion");
	}
})
