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
function editarItem() {
    const parametro = new URLSearchParams(window.location.search);
    const nombre = parametro.get('nombre');
    window.location.href = `carga.html?editar=${encodeURIComponent(nombre)}`;
}

function eliminarContenido() {
	const parametro = new URLSearchParams(window.location.search);
	const editar = parametro.get("editar");
  
	// Confirmar la eliminación
	if (confirm("¿Estás seguro de que quieres eliminar este contenido?")) {
	  fetch(`http://localhost:3000/api/v1/Contenido/${encodeURIComponent(editar)}`, {
		method: "DELETE",
	  })
		.then((response) => {
		  if (response.ok) {
			alert("Contenido eliminado correctamente");
			window.location.href = "items.html"; // Redirigir a la lista de contenido
		  } else {
			alert("Error al eliminar");
		  }
		})
		.catch((error) => console.error("Error:", error));
	}
  }
  


// document.getElementById('plataforma').addEventListener('click', ()=>{
// 	const direccion = document.getElementById('plataforma').innerText;
// 	window.location.href=`plataformas.html?p=${encodeURIComponent(direccion)}`;
// })