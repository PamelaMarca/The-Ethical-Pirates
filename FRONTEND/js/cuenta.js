function iniciado(){
	const navegador=document.querySelector('#navegador_interno');
	const boton_registro=document.querySelector('#ingresar');
	const index = document.querySelector('#index')
	navegador.style.display = 'block';
	boton_registro.style.display = 'none';
	index.style.display= "none"
}
function limpiar_formulario(){
	const inputs = document.querySelectorAll(`input`);
	inputs.forEach( input =>
		input.value =''
	);
}

function solicitud_registro(event){	
	event.preventDefault();
	const nombre = document.getElementById('nombre');
	const apellido = document.getElementById('apellido');
	const nacimiento = document.getElementById('nacimiento');
	const genero = document.getElementById('genero');
	const correo = document.getElementById('email');
	const contacto = document.getElementById('telefono');
	const usuario_nombre = document.getElementById('usuario');
	const clave = document.getElementById('contraseña');

	fetch(`http://localhost:3001/api/v1/cuentas/${usuario_nombre}`)
	.then(respuesta => respuesta.json)
	.then(user =>{
		//vemos si existe el nombre
		if(user.cuenta){
			alert('El Nombre de usuario ya existe');
		}else{
			fetch('http://localhost:3001/api/v1/registro',{
				method: "POST",
				headers:{
					'Content-Type':'application/json'
				},
				//adjuntar los datos para una nueva cuenta
				body: JSON.stringify({
					DATOS: {
						NOMBRE: nombre.value,
						APELLIDO: apellido.value,
						FECHA_NACIMIENTO: nacimiento.value,
						GERERO: genero.value,
						EMAIL: correo.value,
						TEL: contacto.value
					},
					NOMBRE_USUARIO:usuario_nombre.value,
					CLAVE:clave.value
				})
			})
			.then( res => {
				if(res.ok){
					return res.json();
				}else{
					return res.json().then(e =>{
						new Error(e.mensaje);
					});
				}
			})
			.then( json =>{
				const index = document.getElementById('index');
				index.style.display='none';
				alert("Registro exitoso");
				limpiar_formulario();
				iniciado();
			})
			.catch(error => {
				console.log('Error al registrarse');

			})
		}		
	});
}


function solicitud_entrar(event){
	event.preventDefault();
	const nombre = document.getElementById('Usuario');
	const clave = document.getElementById('Contraseña');
	const mensaje = document.getElementById('mensaje_error_inicio');

	fetch('http://localhost:3001/api/v1/inicio',{
		method: "POST",
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify({
			NOMBRE_USUARIO: nombre.value,
			CLAVE: clave.value
		})
	})
	.then(res => res.json)
	.then(json=>{
		//si existe:
		console.log(json)
		if(json.usuario){
			
			if(json.CLAVE == clave.value){
				const index = document.getElementById('index');
				index.style.display='none';
				alert("Exito");
				iniciado();
	
			}else{
				mensaje.innerHTML=`<p>Contraseña incorrecta o Nombre de usuario incorrecta</p>`
			}
		}
		//No existe: la cuenta si no existe no hago nada, que intente denuevo o se registre

	})
	.catch(error =>{
		alert("Algo salio mal al Iniciar Secion");
	})

}

