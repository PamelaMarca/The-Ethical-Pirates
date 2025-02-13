function iniciado(){
	let navegador=document.getElementById('navegador_interno');
	const boton_registro=document.getElementById('ingresar');
	const index = document.getElementById('index');
	navegador.style.display = 'block';
	boton_registro.style.display = 'none';
	index.style.display= 'none';
}

function sesion_cerrada() {
	let navegador=document.getElementById('navegador_interno');
	const boton_registro=document.getElementById('ingresar');
	const index = document.getElementById('index');
	navegador.style.display = 'none';
	boton_registro.style.display = 'block';
	index.style.display= 'block';

	if(localStorage.getItem('token')){
		localStorage.removeItem('token');
		localStorage.removeItem('nombre_usuario');
	}
}

function verificar_sesion(){
	const token = localStorage.getItem("token");
	if(!token){ 
		sesion_cerrada();
	}else{
		iniciado();
	}
}
