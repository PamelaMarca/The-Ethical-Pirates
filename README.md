# The-Ethical-Pirates

# Piratas del Cine
## Descripción
- "Piratas del Cine" es una plataforma que permite a los usuarios buscar películas y series, ver en qué plataformas están disponibles y gestionar sus preferencias. Los usuarios pueden registrarse, iniciar sesión para guardar sus películas y series favoritas, y también tienen la opción de agregar títulos que no estén en la base de datos de la plataforma.

## Objetivo
- El proyecto tiene como objetivo mejorar la experiencia del usuario al ofrecerle una manera rápida y eficiente de encontrar contenido en múltiples plataformas de streaming. Además, permite a los usuarios contribuir agregando contenido nuevo a la plataforma.

## Características
- Búsqueda de Películas y Series: Los usuarios pueden buscar fácilmente títulos de películas y series y obtener información sobre en qué plataformas están disponibles.
- Gestión de Favoritos: Los usuarios registrados pueden guardar sus películas y series favoritas.
- Agregar Títulos Nuevos: Los usuarios pueden agregar títulos de películas o series que no se encuentren en la plataforma.
- Inicio de sesión y Registro: Los usuarios pueden crear cuentas e iniciar sesión para personalizar su experiencia.

# Instalación y dependencias
A continuación se detallan las dependencias necesarias para ejecutar el proyecto:

1. Node.js
Asegúrate de tener instalada la última versión de Node.js.

2. SQLite
El proyecto utiliza SQLite como base de datos. No se necesita instalación adicional ya que es un motor de base de datos ligero y se manejará dentro del proyecto.

3. Docker (Opcional)
Si prefieres ejecutar el proyecto en un contenedor, necesitarás tener instalado Docker para facilitar la ejecución.

4. Dependencias de desarrollo
Se requiere instalar varias dependencias de Node.js que puedes agregar con npm:

- express: Framework para crear el servidor web.
- cors: Middleware para manejar solicitudes CORS (Cross-Origin Resource Sharing).
- sequelize: ORM para manejar las interacciones con la base de datos.
- router: Para manejar las rutas dentro del servidor Express.

- Para instalar las dependencias, ejecuta el siguiente comando:

````sh
npm install express cors sequelize sqlite3
````