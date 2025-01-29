# TABLAS

## tabla 1_ peliculas:
- id (oculto)
- nombre
- fecha de lanzamiento
- imagen de protada ---opcional
- genero
- sinopsis ---opcional (sino se ingresa nada poner "Sin Descripcion")
- lick de la pelicula para redirigir.
- plataforma
- privado o publico --- sera un filtro para lo que se muestra y no

## tabla 2_ series:
- id (oculto)
- nombre
- estado (en emision, terminado, cancelado)
- - fecha de proximo capitulo
- imagen de portada --opcional
- temporadas
- genero
- plataforma
- sinopsis
- lista de link segun cantidad de capitulos.
- privado o publico

## tabla 3_ usuario(Oculto):
- id (podriamos mostrarlo como una credencial)
- nombre de usuario -- debe ser unico, asique en caso de que exista avisar y esto debe conectarse con la contraseña
<!-- - historial -->
- ###tabla de favoritos
- ###tabla de publicaciones --- podria hacer que se modifique entre ser privado o publico 
- ###tabla de reseñas/comentarios (se vera a fondo) //por el momento no cuenta como campo
- ###tabla para ver mas tarde (como una lista de pendiente)

- ###tabla _generos(son etiquetas porloque deberan ser conectores):
- id
- nombre de genero
- peliculas o series con ese genero ---crearles conexion

## tabla _plataformas(sera una solapa por lo que debera listarse todas y mostrar su contenido ser conectores):
- id
- nombre de plataforma --- como NETFLIX o HBO+
- peliculas o series con ese genero ---crearles conexion
- imagen de logo