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
  
    // Eliminar la parte de la hora (si la hay)
    fecha = fecha.split("T")[0]; // Extrae solo la fecha (YYYY-MM-DD)
  
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
      FECHA_ESTRENO: fecha, // Ahora solo contiene la fecha sin la hora
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
        if (json.mensaje && json.nuevaPelicula === undefined && json.nuevaSerie === undefined) {
          alert("Error: " + json.mensaje);
        } else {
          alert("Contenido subido con éxito.");
          // Opcional: limpiar el formulario
          document.getElementById("formularioContenido").reset();
        }
      })
      .catch((error) => {
        console.error("Error en la petición:", error);
        alert("Ocurrió un error al enviar los datos. Intenta nuevamente más tarde.");
      });
  }
  
  // Asignar la función al evento submit del formulario
  document
    .getElementById("formularioContenido")
    .addEventListener("submit", solicitud_carga);
  