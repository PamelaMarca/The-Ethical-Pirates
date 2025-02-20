// Función para subir contenido nuevo (POST)
function solicitud_carga(event) {
    event.preventDefault();
  
    // Verificar que el usuario esté autenticado
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para subir contenido.");
      return;
    }
  
    // Capturar los valores del formulario
    const nombre = document.getElementById("nombre").value;
    let fecha = document.getElementById("fecha").value;
    fecha = fecha.split("T")[0];
    const tipo = document.getElementById("tipo").value;
    const genero = document.getElementById("genero").value;
    const idioma = document.getElementById("idioma").value;
    const edad = document.getElementById("edad").value;
    const sinopsis = document.getElementById("sinopsis").value;
    const calificacion = document.getElementById("calificacion").value;
    const plataforma = document.getElementById("plataforma").value;
    const poster = document.getElementById("poster").value;
    const acceso = document.getElementById("acceso").value;
    const link = document.getElementById("link").value;
  
    // Crear objeto con los datos a enviar
    const datos = {
      NOMBRE_COMPLETO: nombre,
      FECHA_ESTRENO: fecha,
      GENERO: genero,
      IDIOMA_ORIGINAL: idioma,
      EDAD_RECOMENDADA: edad,
      SINOPSIS: sinopsis,
      CALIFICACION: parseFloat(calificacion) || null,
      PLATAFORMA: plataforma,
      URL_POSTER: poster,
      ACCESO: acceso,
      LINK: link,
    };
  
    // Determinar la URL de la API según el tipo de contenido
    let urlApi = "";
    if (tipo === "pelicula") {
      urlApi = "http://localhost:3000/api/v1/Peliculas";
    } else if (tipo === "serie") {
      urlApi = "http://localhost:3000/api/v1/Series";
    } else {
      alert("Tipo de contenido no válido.");
      return;
    }
  
    // Enviar los datos al servidor mediante fetch
    fetch(urlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.mensaje && !json.nuevaPelicula && !json.nuevaSerie) {
          alert("Error: " + json.mensaje);
        } else {
          alert("Contenido subido con éxito.");
          // Limpiar el formulario
          document.getElementById("formularioContenido").reset();
        }
      })
      .catch((error) => {
        console.error("Error en la petición:", error);
        alert("Ocurrió un error al enviar los datos. Intenta nuevamente más tarde.");
      });
  }
  
  // Función para actualizar el contenido existente (PUT)
  function guardarCambios(event) {
    event.preventDefault();
    const parametro = new URLSearchParams(window.location.search);
    const editar = parametro.get("editar");
  
    // Verificar token de autenticación
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para editar el contenido.");
      return;
    }
  
    // Preparar el objeto con los datos actualizados
    const nuevoContenido = {
      NOMBRE_COMPLETO: document.getElementById("nombre").value,
      FECHA_ESTRENO: document.getElementById("fecha").value,
      GENERO: document.getElementById("genero").value,
      IDIOMA_ORIGINAL: document.getElementById("idioma").value,
      EDAD_RECOMENDADA: document.getElementById("edad").value,
      SINOPSIS: document.getElementById("sinopsis").value,
      CALIFICACION: parseFloat(document.getElementById("calificacion").value) || null,
      PLATAFORMA: document.getElementById("plataforma").value,
      URL_POSTER: document.getElementById("poster").value,
      ACCESO: document.getElementById("acceso").value,
      LINK: document.getElementById("link").value,
    };
  
    // Enviar los datos al servidor mediante PUT a la ruta de actualización
    fetch(`http://localhost:3000/api/v1/Contenido/${encodeURIComponent(editar)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(nuevoContenido),
    })
      .then((response) => {
        if (response.ok) {
          alert("Actualizado correctamente");
          window.location.href =
            "items.html?nombre=" + encodeURIComponent(nuevoContenido.NOMBRE_COMPLETO);
        } else {
          response.json().then((json) => alert("Error al actualizar: " + json.mensaje));
        }
      })
      .catch((error) => console.error("Error:", error));
  }
  
  // Al cargar la página se determina si se está en modo edición o creación
  window.onload = function () {
    const parametro = new URLSearchParams(window.location.search);
    const editar = parametro.get("editar");
    const form = document.getElementById("formularioContenido");
    const submitButton = form.querySelector("button[type='submit']");
  
    if (editar) {
      // Modo edición: cambiar texto del botón y asignar el evento de guardar cambios
      submitButton.textContent = "Guardar cambios";
      form.removeEventListener("submit", solicitud_carga);
      form.addEventListener("submit", guardarCambios);
  
      // Obtener el contenido existente para rellenar el formulario
      fetch(`http://localhost:3000/api/v1/Contenido/${encodeURIComponent(editar)}`)
        .then((res) => res.json())
        .then((dato) => {
          // Asignar los valores recibidos al formulario
          document.getElementById("nombre").value = dato.NOMBRE_COMPLETO;
          if (dato.FECHA_ESTRENO) {
            const fechaFormateada = new Date(dato.FECHA_ESTRENO).toISOString().split("T")[0];
            document.getElementById("fecha").value = fechaFormateada;
          }
          document.getElementById("genero").value = dato.GENERO || "";
          document.getElementById("idioma").value = dato.IDIOMA_ORIGINAL || "";
          document.getElementById("edad").value = dato.EDAD_RECOMENDADA || "";
          document.getElementById("sinopsis").value = dato.SINOPSIS || "";
          document.getElementById("calificacion").value = dato.CALIFICACION || "";
          document.getElementById("plataforma").value = dato.PLATAFORMA || "";
          document.getElementById("poster").value = dato.URL_POSTER || "";
          document.getElementById("acceso").value = dato.ACCESO || "";
          document.getElementById("link").value = dato.LINK || "";
        })
        .catch((error) => console.error("Error al cargar el contenido:", error));
    } else {
      // Modo creación: asignar el evento de carga normal
      form.addEventListener("submit", solicitud_carga);
    }
  };
  