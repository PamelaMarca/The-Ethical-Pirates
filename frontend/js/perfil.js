// codificacion por los espacios en el nombre
const parametro = new URLSearchParams(window.location.search);
const nombre = parametro.get('cuenta');
const us = document.getElementById('nombre_usuario');
const datos_pers = document.getElementById('datos_persona');
const datos_us = document.getElementById('datos_usuario');

async function perfil_usuario(){
	const usuario_nombre= localStorage.getItem('nombre');
	const token = localStorage.getItem('token');
	fetch(`http://localhost:3000/api/v1/cuentas/${nombre?? usuario_nombre}`,{
		method: "GET",
		headers:{
			'Authorization':'Bearer ' + token,
			'Content-Type': 'application/json'
		}
	})
	.then(res => {
		return res.json();
	})
	.then(user =>{
		if(token){
			datos_pers.innerHTML="";
			datos_us.innerHTML="";
			const botones= document.getElementById('botones');
			botones.innerHTML="";
			us.innerText = user.nombre_usuario;
			const nombre_real= document.createElement('p'); 
			nombre_real.innerText= `Nombre/s: ${user.nombre}`;
			datos_pers.appendChild(nombre_real);
			const apellido= document.createElement('p'); 
			apellido.innerText= `Apellido/s: ${user.apellido}`;
			datos_pers.appendChild(apellido);
			const fecha= document.createElement('p'); 
			fecha.innerText= `Fecha de nacimeinto: ${user.fecha_nacimiento}`;
			datos_pers.appendChild(fecha);
			const genero= document.createElement('p'); 
			genero.innerText= `Genero: ${user.genero}`;
			datos_pers.appendChild(genero);
			const email= document.createElement('p'); 
			email.innerText= `Correo electronico: ${user.email? user.email:"agregar correo"}`;
			datos_pers.appendChild(email);
			const tel= document.createElement('p'); 
			tel.innerText= `Telefono: ${user.telefono? user.telefono: "agregar numero"}`;
			datos_pers.appendChild(tel);
			
			const usuario = document.createElement('p');
			usuario.innerText = `Nombre de Usuario: ${user.nombre_usuario}`;
			datos_us.appendChild(usuario);
			const contra = document.createElement('p');
			contra.innerText = `Contraseña: ************`;
			datos_us.appendChild(contra);
			
			//botones
			const boton_cambios = document.createElement('button');
			boton_cambios.id="editar_cuenta";
			boton_cambios.classList.add('editar_datos');
			boton_cambios.innerText="Editar Perfil";
			boton_cambios.onclick=()=>editar_cuenta(user);
			botones.appendChild(boton_cambios);

			const boton_cancelar = document.createElement('button');
			boton_cancelar.id="borrar_cuenta";
			boton_cancelar.classList.add('borrar');
			boton_cancelar.innerText="Eliminar cuenta";
			boton_cancelar.onclick=borrando_cuenta;
			botones.appendChild(boton_cancelar);

		}else{
			window.location.href="inicio_registro.html";
		}

	});
}

function mostrar_confirmacion(palabra){
	return new Promise((resolve)=>{
		const tipo = document.getElementById('palabra');
		const cuadro = document.getElementById('confirmar_accion');
		tipo.innerText= palabra;
		cuadro.style.display= 'block';
		//aqui veo que apretara el usuario
		window.confirmar_respuesta = resolve;
	});
}

function respuesta_resibida(desicion){
	const cuadro = document.getElementById('confirmar_accion');
	cuadro.style.display = 'none';
	window.confirmar_respuesta(desicion);
}

async function editar_cuenta(user) {
	const desicion= await mostrar_confirmacion("editar");
	if (desicion){
		// vacio valores anteriores
		datos_pers.innerHTML="";
		datos_us.innerHTML="";
		const botones= document.getElementById('botones');
		botones.innerHTML="";
		//input para nombre y apellido
		const text_nombre = document.createElement('h4');
		text_nombre.innerText= "Nombre:";
		const nombre_real = document.createElement('input');
		nombre_real.type="text";
		nombre_real.placeholder=user.nombre;
		nombre_real.id="nombre_edit";
		datos_pers.appendChild(text_nombre);
		datos_pers.appendChild(nombre_real);

		const text_apell = document.createElement('h4');
		text_apell.innerText= "Apellido:";
		const apellido = document.createElement('input');
		apellido.type="text";
		apellido.placeholder=user.apellido;
		apellido.id="apellido_edit";
		datos_pers.appendChild(text_apell);
		datos_pers.appendChild(apellido);

		//input para genero
		const text_gen = document.createElement('h4');
		text_gen.innerText= "Genero";
		const genero = document.createElement('select');
		const no_opcion= document.createElement('option');
		const opcion1 = document.createElement('option');
		const opcion2 = document.createElement('option');
		const opcion3 = document.createElement('option');
		no_opcion.innerText= "Seleccione su Genero";
		no_opcion.value="";
		genero.appendChild(no_opcion);
		opcion1.value="Otro";
		opcion1.innerText= "Otro";
		genero.id="genero_edit";
		genero.appendChild(opcion1);

		opcion2.value="Femenino";
		opcion2.innerText= "Femenino";
		genero.appendChild(opcion2);

		opcion3.value="Masculino";
		opcion3.innerText= "Masculino";
		genero.appendChild(opcion3);
		datos_pers.appendChild(text_gen);
		datos_pers.appendChild(genero);

		//input para email
		const text_email = document.createElement('h4');
		text_email.innerText= "Email:";
		const email = document.createElement('input');
		email.type="email";
		email.placeholder= user.email== '' ? 'ej: sincorreo@gmail.ar': user.email ;
		email.id="email_edit";
		datos_pers.appendChild(text_email);
		datos_pers.appendChild(email);

		//input para telefono
		const text_tel = document.createElement('h4');
		text_tel.innerText= 'Numero de Telefono: ';
		const tel = document.createElement('input');
		tel.type="tel";
		tel.placeholder= user.telefono;
		tel.id="tel_edit";
		datos_pers.appendChild(text_tel)
		datos_pers.appendChild(tel);

		//input para cambiar contraseña
		const text_clave1 = document.createElement('h5');
		text_clave1.innerText= "Verificar contraseña actual";
		const contra_actual = document.createElement('input');
		const text_clave2 = document.createElement('h5');
		text_clave2.innerText= "Verificar contraseña actual";
		const contra_nueva = document.createElement('input');
		contra_actual.type= "password";
		contra_actual.id= "clave_edit";
		contra_nueva.type= "password";
		contra_nueva.id="claveNueva_edit";
		contra_actual.placeholder="Contraseña actual";
		contra_nueva.placeholder= "Contraseña nueva";
		datos_us.appendChild(text_clave1);
		datos_us.appendChild(contra_actual);
		datos_us.appendChild(text_clave2);
		datos_us.appendChild(contra_nueva);

		const boton_cambios = document.createElement('button');
		boton_cambios.classList.add('editar');
		boton_cambios.innerText="Confirmar cambios";
		boton_cambios.onclick=enviar_cambios;
		botones.appendChild(boton_cambios);

		const boton_cancelar = document.createElement('button');
		boton_cancelar.classList.add('salir');
		boton_cancelar.innerText="Cancelar";
		boton_cancelar.onclick=perfil_usuario;
		botones.appendChild(boton_cancelar);

	}
}

function enviar_cambios(){
	const nombre_real = document.getElementById('nombre_edit').value;
	const apellido = document.getElementById('apellido_edit').value;
	const genero = document.getElementById('genero_edit').value;
	const email = document.getElementById('email_edit').value;
	const contacto = document.getElementById('tel_edit').value;
	const contra_a = document.getElementById('clave_edit').value;
	const contra_n = document.getElementById('claveNueva_edit').value;

	if(nombre_real.trim()==''|| apellido.trim()==''|| genero.trim()=='' || email.trim()=='' || contacto.trim()==''){
		alert("Campos vacios no seran modificados");
	}
	const usuario_nombre= localStorage.getItem('usuario_nombre');
	fetch(`http://localhost:3000/api/v1/cuenta/${nombre?? usuario_nombre}`,{
	 	method: "PUT",
		headers:{
			'Content-Type':'application/json'
		},
		body: JSON.stringify({
			NOMBRE: nombre_real,
			APELLIDO: apellido,
			GENERO: genero,
			CORREO: email,
			TEL: contacto,
			CLAVE: contra_a,
			NUEVA_CLAVE: contra_n
		})
	})
	.then(res => res.json())
	.then(json =>{
		alert("Cambios guardados");
		perfil_usuario();
	})
}

async function borrando_cuenta() {
	const desicion= await mostrar_confirmacion("Eliminar permanentemente");
	if(desicion){
		const usuario_nombre= localStorage.getItem('usuario_nombre');
		const token = localStorage.getItem('token');
		fetch(`http://localhost:3000/api/v1/cuenta/${nombre?? usuario_nombre}`,{
			method: "DELETE",
			headers:{
				'Authorization': 'Bearer ' + token,
				'Content-Type':'application/json'
			}
		})
		.then(res=> res.json())
		.then(json => {
			if(!json.mensaje){
				localStorage.removeItem("token");
				localStorage.removeItem("usuario_nombre");
				alert("Eliminacion de cuenta exitosa");
				window.location.href='index.html';
			}else{
				alert(json.mensaje);
			}
		})
		.catch(error=> console.error("Error al eliminar cuenta: ",error));
	}
}
