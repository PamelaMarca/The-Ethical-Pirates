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
}

function verificar_sesion(){
	const token = localStorage.getItem("token");

	if(!token){ 
		sesion_cerrada();
	}else{
		iniciado();
	}
}

document.getElementById('perfil_usuario').addEventListener('click', ()=>{
	const token_nombre = localStorage.getItem("nombre");
	const perfil = document.getElementById('perfil_usuario');
	window.location.href= `perfil.html?cuenta=${token_nombre}`
})

document.getElementById('cerrar_sesion').addEventListener('click',()=>{
	sesion_cerrada();
	window.location.href='inicio_registro.html';
})