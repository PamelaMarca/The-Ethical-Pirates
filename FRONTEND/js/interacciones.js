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


function registro_inicio(){
	const registro= document.querySelector('.formularios .formulario-registro');
	const inicio= document.querySelector('.formularios .formulario-inicio');
	const contenedor = document.querySelector('.formularios');
	const pregunta_registro = document.querySelector('.pregunta-registro');          
	const pregunta_inicio = document.querySelector('.pregunta-inicio');          
	
	if(registro.style.display==='none' || registro.style.display===''){
		registro.style.display="block";
		pregunta_inicio.style.opacity='1';
		contenedor.style.left="50%";
		inicio.style.display="none";
		pregunta_registro.style.opacity='0';
		
	}else{
		contenedor.style.left="0";
		inicio.style.display="block"
		registro.style.display="none";
		pregunta_registro.style.opacity='1';
		pregunta_inicio.style.opacity='0';
	}
}
