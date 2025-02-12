function iniciado(){
	let navegador=document.getElementById('navegador_interno');
	const boton_registro=document.getElementById('ingresar');
	const index = document.getElementById('index');
	console.log(navegador,boton_registro,index);
	navegador.style.visibility = 'block';
	boton_registro.style.visibility = 'none';
	index.style.visibility= 'none';
}

function verificar_sesion(){

}

function cerrar_sesion() {
	let navegador=document.getElementById('navegador_interno');
	const boton_registro=document.getElementById('ingresar');
	const index = document.getElementById('index');
	navegador.style.visibility = 'none';
	boton_registro.style.visibility = 'block';
	index.style.visibility= 'block'
}
