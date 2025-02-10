const navegador = document.querySelector('.navegador');
const contenedor_buscador = document.getElementById('buscador');
const barra_busqueda = document.getElementById('search');

//implementa el diseño de las peliculas y series agrupadas
function items(variable, lista){
		const fila = document.createElement('li');
		const url_imagen = variable.URL_POSTER? variable.URL_POSTER : './imagenes/sin_imagen.jpg';
		fila.classList.add('items');
		fila.innerHTML= `
		<div class="info"><p>Nombre: <a href="Items.html?nombre=${variable.NOMBRE_COMPLETO}" class="nombre_item" data-id="${variable.ID_UNICO}"><strong>${variable.NOMBRE_COMPLETO}</strong></a></p>
			<p>Lanzamiento: ${variable.FECHA_ESTRENO}</p>
			<p>Genero: ${variable.GENERO}</p>
			<p>Sinopsis: ${variable.SINOPSIS}</p>
		</div>
		<img class="imagen" src="${url_imagen}" width='170px'>
		` ;

		lista.appendChild(fila);
}

// la funcion para recibir la palabra y buscar de ella
function buscar(){
	const valor = document.getElementById('search').value;
	const cuadro= document.querySelector('.cuadro');
    let tipo;
    if (window.location.href.includes("Peliculas")) {
        tipo = "peliculas";
    } else if (window.location.href.includes("Series")) {
        tipo = "series";
    } else {
        tipo = "todo";
    }
	if (valor){
		fetch(`http://localhost:3000/busqueda/buscar?q=${valor}`)
		.then(respuesta => respuesta.json())
		.then(json =>{
			cuadro.innerHTML =`<h2>Resultados</h2>`;
            if(tipo == 'peliculas' || tipo == 'todo'){
                const PELIS = document.createElement('div');
                const lista_P = document.createElement('ul');
                PELIS.innerHTML= `<h3 style="margin:10px;">Películas: ${json.peliculas.length}</h3>`;
                lista_P.classList.add('fichas');
                if(json.peliculas.length > 0){
                    json.peliculas.forEach(pelicula =>{
                        items(pelicula,lista_P);
                    });
                    PELIS.appendChild(lista_P)
                }else {
                    parrafo = document.createElement('p');
                    parrafo.style.margin= "10px 20px"
                    parrafo.style.fontSize="20px"
                    parrafo.innerText= "No se encontraron resultados."
                    PELIS.appendChild(parrafo)
                }
                cuadro.appendChild(PELIS);
            }

            if(tipo =='series' || tipo== 'todo'){
                const SERIES = document.createElement('div');
                const lista_S = document.createElement('ul');
                lista_S.classList.add('fichas');
                SERIES.innerHTML= `<h3 style="margin:10px;">Series: ${json.series.length}</h3>`;
                if (json.series.length >0){
                    json.series.forEach(serie =>{
                        items(serie, lista_S);
                    })
                    SERIES.appendChild(lista_S)
                }else{
                    parrafo = document.createElement('p');
                    parrafo.style.margin= "10px 20px"
                    parrafo.style.fontSize="18px"
                    parrafo.innerText= "No se encontraron resultados."
                    SERIES.appendChild(parrafo)
                }
                
                cuadro.appendChild(SERIES);
            }

			document.getElementById('search').value = ''
		})
		.catch(error=>{
			cuadro.innerHTML=`Hubo un error en la busqueda`;
		})      
	}else{
		cuadro.innerHTML=`<h2>No se ingreso nada</h2>`
	}

}

function posicion_original(){
	if(window.innerWidth < 610){
		navegador.style.display="flex";
		barra_busqueda.classList.remove('extendido');
		barra_busqueda.style.display = "none";
		contenedor_buscador.style.width ='';
	}
}

document.getElementById('buscar').addEventListener('click',()=>{
	let expandido = barra_busqueda.classList.contains('extendido');
	if(window.innerWidth < 610 && !expandido){
		barra_busqueda.classList.add('extendido');
		navegador.style.display ="block"
		barra_busqueda.style.display = "block";
		contenedor_buscador.style.width ='100%';
		barra_busqueda.focus();
	}else{
		buscar();
		posicion_original();
	}
})

document.getElementById('search').addEventListener('blur', posicion_original);

function diseño (dato){
	const cuadro = document.getElementById('contenido_item');
	const contenedor = document.getElementById('item_informacion');
	const imagen= document.createElement('img');
	imagen.style.maxWidth="350px";
	const datos_entretenimiento= document.createElement('div');
	datos_entretenimiento.classList.add('datos_items');
	const titulo= document.getElementById('titulo_item');
	const calificacion = document.createElement('p');
	const estreno = document.createElement('p');
	const recomendado_para= document.createElement('p');
	const temporadas = document.createElement('p');
	const duracion = document.createElement('p');
	const generos = document.createElement('p');
	const idioma = document.createElement('p');
	const plataforma = document.createElement('p');
	const cuadro_sinopsis =document.createElement('div');
	const cuadro_link =document.createElement('section');
	cuadro_sinopsis.classList.add('caja_sinopsis');
	
	imagen.src= dato.URL_POSTER? dato.URL_POSTER : './imagenes/sin_imagen.jpg';
	imagen.style.width="300px"
	titulo.innerText=dato.NOMBRE_COMPLETO;

	calificacion.innerText= `Calificacion: ${dato.CALIFICACION}`;
	datos_entretenimiento.appendChild(calificacion);

	estreno.innerText=`Fecha de estreno: ${dato.FECHA_ESTRENO=='undefine'? dato.FECHA_ESTRENO: "xx-xx-xxxx"}`;
	datos_entretenimiento.appendChild(estreno);

	recomendado_para.innerText=`Apto para ${dato.EDAD_RECOMENDADA=='undefine'? dato.EDAD_RECOMENDADA : " todo publico"}`;
	datos_entretenimiento.appendChild(recomendado_para);

	if((dato.TOTAL_TEMPORADAS) != undefined && dato.TOTAL_TEMPORADAS != null){
		temporadas.innerText= `Cantidad de Temporadas: ${dato.TOTAL_TEMPORADAS}`;
		datos_entretenimiento.appendChild(temporadas);
	}else if(dato.TOTAL_DURACION != undefined){
		duracion.innerText= `Tiempo de duracion: ${dato.TOTAL_DURACION}`;
		datos_entretenimiento.appendChild(duracion);
	}
	generos.innerHTML=`Genero: ${dato.GENERO}`;
	idioma.innerHTML=`Idioma original: ${dato.IDIOMA_ORIGINAL}`;
	plataforma.innerHTML=`Plataforma: ${dato.PLATAFORMA=='undefine'? dato.PLATAFORMA: "sin dato"}`;

	cuadro_sinopsis.innerHTML=`<h3>Descripcion</h3>`
	const sinopsis= document.createElement('div');
	sinopsis.classList.add('sinopsis');

    const parrafos_sinopsis =  [];
	dato.SINOPSIS.split('\n').map(parrafo => {
		const p = document.createElement('p');
		p.innerText=parrafo;
		parrafos_sinopsis.push(p);
	})

	parrafos_sinopsis.forEach(p=> sinopsis.appendChild(p));
	cuadro_sinopsis.appendChild(sinopsis);
	cuadro_link.innerHTML=`<h3>Rediccion: <a href="${dato.LINK}">ver</a></h3>`

	datos_entretenimiento.appendChild(generos);
	datos_entretenimiento.appendChild(idioma);
	datos_entretenimiento.appendChild(plataforma);

	contenedor.appendChild(imagen);
	contenedor.appendChild(datos_entretenimiento);
	cuadro_sinopsis.appendChild(cuadro_link);
	cuadro.appendChild(contenedor);
	cuadro.appendChild(cuadro_sinopsis);
}