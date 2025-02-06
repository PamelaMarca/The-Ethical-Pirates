function iniciado(){
	const navegador=document.getElementById('navegador_interno');
	const boton_registro=document.getElementById('ingresar');
	const index = document.getElementById('index');
	navegador.style.display = 'block';
	//alparecer esto ayudara a que 
	boton_registro.style.display = 'none';
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

	if(nombre.value=='' || apellido.value=='' || usuario.value=='' || clave.value=='' ){
		mensaje.innerHTML=`<p>Conplete el campo faltante</p>`
	}
	else{
		fetch('http://localhost:3000/api/v1/registro',{
			method: "POST",
			headers:{
				'Content-Type':'application/json'
			},
			//adjuntar los datos para una nueva cuenta
			body: JSON.stringify({
				nombre: nombre.value,
				apellido: apellido.value,
				nacimiento: nacimiento.value,
				genero: genero.value,
				correo: correo.value,
				contacto: contacto.value,
				usuario: usuario.value,
				clave: clave.value
			})
		})
		.then( res => res.json())
		.then( json => {
			if(json.mensaje == undefined ){
				alert("Registro exitoso");
				window.location.href=`perfil.html?cuenta=${usuario.value}`
			}else{
				mensaje.innerHTML=`<p>${json.mensaje}</p>`;
			}
		})
        .catch(error =>{
            mensaje.innerHTML=`<p>Ocurrio un error al registrarse. Intente mas tarde</p>`
        })
	}
}


function solicitud_entrar(event){
	event.preventDefault();
	const usuario_nombre = document.getElementById('Usuario').value;
	const clave = document.getElementById('Contraseña').value;
	const mensaje = document.getElementById('mensaje_error_inicio');
	if(usuario_nombre=='' || clave==''){
        mensaje.innerHTML=`<p>Conplete el campo faltante</p>`

    }else{
        fetch(`http://localhost:3000/api/v1/inicio`,{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            //adjuntar los datos para una nueva cuenta
            body: JSON.stringify({
                us: usuario_nombre,
                clave: clave
            })
        })
        .then(res => res.json())
        .then(json =>{
            if(json.mensaje ==undefined){
                navegador.setAttribute("data-iniciado","true");
                alert(`Inicio de sesion exitoso.Aprete 'aceptar' para ser redirigido`);
                window.location.href=`perfil.html?cuenta=${usuario_nombre}`;
            }else{
                mensaje.innerHTML=`<p>${json.mensaje}</p>`;
            }
    
        })
        .catch(error =>{
            mensaje.innerHTML=`<p>Ocurrio un error al entrar. Intente mas tarde</p>`
        })
    }
    
}
