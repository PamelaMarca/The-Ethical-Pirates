function desplegar() {
	const menu = document.querySelector('#navegador_interno .cuadro_interno');
	const icono = document.querySelector('.icono_menu');
	if (menu.style.display === 'none' || menu.style.display === '') {
		menu.style.display = 'block' ;
		icono.innerHTML='x';
	} 
	else {
		menu.style.display = 'none';
		icono.innerHTML = '☰';
	}
}
function desplega_biblio(){
	const menu= document.getElementById('menu');
	const signo =document.getElementById('signo');
	menu.hidden=!menu.hidden;
	if(menu.hidden)
		signo.innerHTML = '&lt;';
	else 
		signo.innerHTML = 'v';
}
function iniciado(){
	const navegador=document.querySelector('#navegador_interno');
	const boton_registro=document.querySelector('#ingresar');
	if(navegador.style.display=== 'none' || navegador.style.display==''){
		navegador.style.display = 'block';
		boton_registro.style.display='none';
	}
	else{
		navegador.style.display = 'none';
		boton_registro.style.display='block';
	}

}