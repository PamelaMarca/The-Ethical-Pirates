function desplegar() {
	const menu = document.querySelector('#navegador_interno .cuadro_interno');
	const icono = document.querySelector('.icono_menu');
	if (menu.style.display === 'none' || menu.style.display === '') {
		menu.style.display = 'block' ;
        icono.innerHTML = "✖";
	}else {
		menu.style.display = 'none';
		icono.innerHTML = "☰";
	}
}

function desplega_biblio() {
    const menu = document.getElementById('menu');
    const signo = document.getElementById('signo');
    menu.classList.toggle('oculto'); 
    signo.innerHTML = menu.classList.contains('oculto') ? '&lt;' : 'v';
}

const registro= document.querySelector('.formularios .formulario-registro');
const inicio= document.querySelector('.formularios .formulario-inicio');
const contenedor = document.querySelector('.formularios');
const pregunta_registro = document.querySelector('.pregunta-registro');          
const pregunta_inicio = document.querySelector('.pregunta-inicio'); 

function boton_registro(){
	if(window.innerWidth<471){
			registro.style.display="block";
			inicio.style.display="none";
			pregunta_inicio.style.display="block";
			pregunta_registro.style.display="none";
			pregunta_inicio.style.opacity="1";
	}else{
		registro.style.display="block";
		pregunta_inicio.style.opacity='1';
		contenedor.style.left="50%";
		inicio.style.display="none";
		pregunta_registro.style.opacity='0';

	}
}
function boton_inicio(){
	if(window.innerWidth < 471){
		registro.style.display="none";
		inicio.style.display="block";
		pregunta_inicio.style.display="none";
		pregunta_registro.style.display="block";
	}else{
		contenedor.style.left="0";
		inicio.style.display="block"
		registro.style.display="none";
		pregunta_registro.style.opacity='1';
		pregunta_inicio.style.opacity='0';
	}
}

// document.getElementById('plataforma').addEventListener('click', ()=>{
// 	const direccion = document.getElementById('plataforma').innerText;
// 	window.location.href=`plataformas.html?p=${encodeURIComponent(direccion)}`;
// })