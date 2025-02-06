function iniciado() {
    const navegador = document.querySelector('#navegador_interno');
    const boton_registro = document.querySelector('#ingresar');
    const index = document.querySelector('#index');
    
    navegador.style.display = 'block';
    boton_registro.style.display = 'none';
    index.style.display = "none";
}

function limpiar_formulario() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
}

function solicitud_registro(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const nacimiento = document.getElementById('nacimiento');
    const genero = document.getElementById('genero');
    const correo = document.getElementById('email');
    const contacto = document.getElementById('telefono');
    const usuario_nombre = document.getElementById('usuario');
    const clave = document.getElementById('contraseña');

    // Verificar si el usuario ya existe
    fetch(`http://localhost:3000/api/v1/cuentas/${usuario_nombre.value}`)
        .then(respuesta => respuesta.json())
        .then(user => {
            if (user.cuenta) {
                alert('El Nombre de usuario ya existe');
            } else {
                // Registrar nuevo usuario
                fetch('http://localhost:3000/api/v1/registro', { // Corregí el puerto
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        DATOS: {
                            NOMBRE: nombre.value,
                            APELLIDO: apellido.value,
                            FECHA_NACIMIENTO: nacimiento.value,
                            GENERO: genero.value,
                            EMAIL: correo.value,
                            TEL: contacto.value
                        },
                        NOMBRE_USUARIO: usuario_nombre.value,
                        CLAVE: clave.value
                    })
                })
                .then(res => res.json()) 
                .then(json => {
                    console.log("Respuesta del backend:", json);
                    if (json.mensaje === "Usuario registrado exitosamente") {
                        alert("Registro exitoso");
                        limpiar_formulario();
                        iniciado();
                    } else {
                        alert(json.mensaje);
                    }
                })
                .catch(error => console.error("Error en la solicitud:", error));
            }
        })
        .catch(error => console.error("Error al verificar usuario:", error));
}

function solicitud_entrar(event) {
    event.preventDefault();

    const nombre = document.getElementById('Usuario');
    const clave = document.getElementById('Contraseña');
    const mensaje = document.getElementById('mensaje_error_inicio');

    fetch('http://localhost:3000/api/v1/inicio', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            NOMBRE_USUARIO: nombre.value,
            CLAVE: clave.value
        })
    })
    .then(res => res.json()) 
    .then(json => {
        if (json.usuario) {
            // 🚨 No se debe comparar la contraseña aquí, el backend ya lo debe hacer
            alert("¡Inicio de sesión exitoso!");
            iniciado();
        } else {
            mensaje.innerHTML = `<p>Contraseña incorrecta o Nombre de usuario incorrecto</p>`;
        }
    })
    .catch(error => {
        console.error("Error al iniciar sesión:", error);
        alert("Algo salió mal al iniciar sesión.");
    });
}
