function iniciado(){
	let navegador=document.getElementById('navegador_interno');
	const boton_registro=document.getElementById('ingresar');
	const index = document.getElementById('index');
	navegador.style.visibility = 'visible';
	boton_registro.style.visibility = 'hidden';
	index.style.visibility= 'hidden';
}

function limpiar_formulario(){
	const inputs = document.querySelectorAll("input");
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
	const correo = document.getElementById('correo');
	const contacto = document.getElementById('telefono');
	const usuario = document.getElementById('usuario');
	const clave = document.getElementById('contra');
	const mensaje = document.getElementById('mensaje_error_registro');

	if(nombre.value=='' || apellido.value=='' || usuario.value=='' || clave.value=='' || genero.value=='' || nacimiento.value==''){
		mensaje.innerHTML="<p>Conplete el campo faltante</p>";
		if(nombre.value =='')
			nombre.style.background= "rgba(252, 158, 158, 0.911)";
		else{
			nombre.style.background="#e0e6e9";
		}
		if(apellido.value =='')
			apellido.style.background= "rgba(252, 158, 158, 0.911)";
		else{
			apellido.style.background="#e0e6e9";
		}
		if(usuario.value =='')
			usuario.style.background= "rgba(252, 158, 158, 0.911)";
		else{
			usuario.style.background="#e0e6e9";
		}
		if(clave.value =='')
			clave.style.background= "rgba(252, 158, 158, 0.911)";
		else{
			clave.style.background="#e0e6e9";
		}
		if(genero.value =='')
			genero.style.background= "rgba(252, 158, 158, 0.911)";
		else{
			genero.style.background="#e0e6e9";
		}
		if(nacimiento.value =='')
			nacimiento.style.background= "rgba(252, 158, 158, 0.911)";
		else{
			nacimiento.style.background="#e0e6e9";
		}
	}
	else{
		fetch("http://localhost:3000/api/v1/registro",{
			method: "POST",
			headers:{
				'Content-Type':'application/json'
			},
			//adjuntar los datos para una nueva cuenta
			body: JSON.stringify({
				NOMBRE: nombre.value,
				APELLIDO: apellido.value,
				FECHA_NACIMIENTO: nacimiento.value,
				GENERO: genero.value,
				CORREO: correo.value,
				CONTACTO: contacto.value,
				USUARIO_NOMBRE: usuario.value,
				CLAVE: clave.value
			})
		})
		.then( res => res.json())
		.then( json => {
			if(json.mensaje){
				mensaje.innerHTML=`<p>${json.mensaje}</p>`;
			}else{
				alert("Registro exitoso. Aprete 'aceptar' para ser redireccionado");
				window.location.href=`perfil.html?cuenta=${usuario.value}`;
			}
		})
        .catch(error =>{
            mensaje.innerHTML="<p>Ocurrio un error al registrarse. Intente mas tarde</p>"
			limpiar_formulario();
        })
	}
}


function solicitud_entrar(event){
	event.preventDefault();
	const usuario_nombre = document.getElementById('Usuario').value;
	const contraseña = document.getElementById('Contraseña').value;
	const mensaje = document.getElementById('mensaje_error_inicio');
	if(usuario_nombre=='' || contraseña==''){
        mensaje.innerHTML="<p>Conplete el campo faltante</p>"

    }else{
        fetch("http://localhost:3000/api/v1/inicio",{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                us: usuario_nombre,
                clave: contraseña
            })
        })
        .then(res => res.json())
        .then(json =>{
            if(!json.mensaje){
				//guardara el token
				localStorage.setItem("token", json.token);
				console.log(usuario_nombre);
                alert("Inicio de sesion exitoso. Aprete 'aceptar' para ser redirigido");
                window.location.href=`perfil.html?cuenta=${usuario_nombre}`;
            }else{
                mensaje.innerHTML=`<p>${json.mensaje}</p>`;
            }
    
        })
        .catch(error =>{
            mensaje.innerHTML="<p>Ocurrio un error al entrar. Intente mas tarde</p>"
        })
    }
    
}
