const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { sequelize, Pelicula, Serie, Usuario, Favoritos, Comentarios } = require('./models');

const app = express();
const busquedaRoutes = require('./routes/busqueda');
const registroRoutes = require('./routes/registro');
const { where } = require('sequelize');

app.use(cors());
app.use(express.json());

app.use('/busqueda', busquedaRoutes);
app.use('/api/v1', registroRoutes);

const PORT = 3000;

// Ruta de bienvenida
app.get('/', (req, res) => {
    const mensaje = `<div class="css_mensaje">
                        <h2>¡Bienvenido!</h2>
                        <p>Buscá, guardá o subí tus peliculas y series favoritas</p>
                        <p>Regístrate o inicia sesión para empezar</p>
                        <a href="inicio_registro.html" class="boton">Iniciar Sesión/ Registrarse</a>
                    </div>`;
    res.json({ mensaje });
});

// Obtener películas o series favoritas
app.get('/api/v1/Favorito/:id/:tipo', verificarToken, async (req, res) => {
    const tipo = req.params.tipo;
    const usuario = req.params.id;

    try {
        let coleccion;
        if (tipo === "Peliculas") {
            coleccion = await Favoritos.findAll({
                where: { id_usuario: usuario, contenido: "pelicula" },
                include: [{ model: Pelicula, as: 'pelicula', attributes: ['NOMBRE_COMPLETO'] }]
            });
        } else if (tipo === "Series") {
            coleccion = await Favoritos.findAll({
                where: { id_usuario: usuario, contenido: "serie" },
                include: [{ model: Serie, as: 'serie', attributes: ['NOMBRE_COMPLETO'] }]
            });
        } else {
            return res.status(400).json({ error: "Tipo no válido" });
        }

        if (coleccion.length === 0)
            return res.status(200).json({ mensaje: "No se encuentran favoritos" });

        const lista_favoritos = coleccion.map(fav => ({
            id_usuario: fav.id_usuario,
            contenido: tipo === "Peliculas" ? fav.pelicula?.NOMBRE_COMPLETO : fav.serie?.NOMBRE_COMPLETO,
            id_contenido: fav.id_contenido
        }));
        res.status(200).json(lista_favoritos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener favoritos" });
    }
});

app.post('/api/v1/Favorito', verificarToken, async (req, res) => {
    const { ID_USUARIO, CONTENIDO, ID_CONTENIDO } = req.body;
    if (!ID_USUARIO || !CONTENIDO || !ID_CONTENIDO)
        return res.status(400).json({ mensaje: "No se logró guardar en favoritos" });
    const yaExiste = await Favoritos.findOne({ where: { id_usuario: ID_USUARIO, contenido: CONTENIDO, id_contenido: ID_CONTENIDO } });
    if (yaExiste)
        return res.status(400).json({ mensaje: "Ya está en favoritos" });
    const favorito = await Favoritos.create({
        id_usuario: ID_USUARIO,
        contenido: CONTENIDO,
        id_contenido: ID_CONTENIDO,
    });
    res.json(favorito);
});

app.delete('/api/v1/Favorito/:ID/:TIPO/:ID_CONTENIDO', verificarToken, async (req, res) => {
    const { ID, TIPO, ID_CONTENIDO } = req.params;
    const favorito = await Favoritos.findOne({ where: { id_usuario: ID, contenido: TIPO, id_contenido: ID_CONTENIDO } });
    if (!favorito) {
        return res.status(400).json({ mensaje: "Error al intentar eliminar de favoritos" });
    }
    await favorito.destroy();
    res.status(200).json(favorito);
});

// Obtener todas las películas públicas
app.get('/api/v1/Peliculas', async (req, res) => {
    const peliculas = await Pelicula.findAll({ where: { ACCESO: "PUBLICO" } });
    res.status(201).json({ respuesta: peliculas.length ? peliculas : { mensaje: "No hay películas disponibles" } });
});

// Obtener una película o serie por nombre
app.get('/api/v1/Contenido/:nombre', async (req, res) => {
    const nombre = decodeURIComponent(req.params.nombre);
    const serie = await Serie.findOne({ where: { NOMBRE_COMPLETO: nombre } });
    const pelicula = await Pelicula.findOne({ where: { NOMBRE_COMPLETO: nombre } });
    if (!pelicula && !serie)
        return res.status(404).json({ mensaje: "Contenido no encontrado" });
    if (pelicula) {
        return res.json({ ...pelicula.toJSON(), tipo: "pelicula" });
    } else {
        return res.json({ ...serie.toJSON(), tipo: "serie" });
    }
});

// Obtener todas las series públicas
app.get('/api/v1/Series', async (req, res) => {
    const series = await Serie.findAll({ where: { ACCESO: "PUBLICO" } });
    res.status(201).json({ respuesta: series.length ? series : { mensaje: "No hay series disponibles" } });
});

// Obtener datos de usuario (sin devolver contraseña)
app.get('/api/v1/cuentas/:us', verificarToken, async (req, res) => {
    try {
        const cuenta = await Usuario.findOne({ where: { nombre_usuario: req.params.us }, attributes: { exclude: ['clave'] } });
        if (!cuenta) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.status(200).json(cuenta);
    } catch (error) {
        console.error("Error al buscar cuenta:", error);
        res.status(500).json({ mensaje: "Error al obtener perfil" });
    }
});

// Ruta para inicio de sesión
app.post('/api/v1/inicio', async (req, res) => {
    try {
        const { us, clave } = req.body;
        const cuenta = await Usuario.findOne({
            where: { nombre_usuario: us },
            attributes: ['id', 'nombre', 'apellido', 'fecha_nacimiento', 'genero', 'email', 'telefono', 'clave']
        });
        if (!cuenta) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }
        if (clave !== cuenta.clave) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ nombre_usuario: cuenta.nombre_usuario }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ token, cuenta });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

// Ruta protegida que requiere autenticación para obtener perfil
app.get('/api/v1/perfil', verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { nombre_usuario: req.usuario.nombre_usuario } });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener perfil' });
    }
});

// Modificar cuenta
app.put('/api/v1/cuenta/:usuario', async (req, res) => {
    const { CLAVE, NUEVA_CLAVE, NOMBRE, APELLIDO, GENERO, CORREO, TEL } = req.body;
    let cuenta = await Usuario.findOne({ where: { nombre_usuario: req.params.usuario } });
    if (!cuenta) return res.status(404).json({ mensaje: "Error. No se pudo encontrar la cuenta" });
    if (CLAVE && NUEVA_CLAVE) {
        if (cuenta.clave === CLAVE && NUEVA_CLAVE.trim() !== '') {
            cuenta.clave = NUEVA_CLAVE;
        } else {
            return res.status(400).json({ mensaje: "Contraseña y/o Nueva contraseña inválida" });
        }
    }
    cuenta.nombre = NOMBRE.trim() === '' ? cuenta.nombre : NOMBRE;
    cuenta.apellido = APELLIDO.trim() === '' ? cuenta.apellido : APELLIDO;
    cuenta.genero = GENERO.trim() === '' ? cuenta.genero : GENERO;
    cuenta.email = CORREO.trim() === '' ? cuenta.email : CORREO;
    cuenta.telefono = TEL.trim() === '' ? cuenta.telefono : TEL;
    await cuenta.save();
    res.status(200).json(cuenta);
});

app.delete('/api/v1/cuenta/:usuario', async (req, res) => {
    try {
        const cuenta = await Usuario.findOne({ where: { nombre_usuario: req.params.usuario } });
        if (!cuenta)
            return res.status(404).json({ mensaje: "Error. No se pudo encontrar la cuenta" });
        await cuenta.destroy();
        res.status(200).json(cuenta);
    } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
        res.status(500).json({ mensaje: "Error al eliminar la cuenta" });
    }
});

// Rutas para carga de contenido
app.post('/api/v1/Peliculas', verificarToken, async (req, res) => {
    try {
        const nuevaPelicula = await Pelicula.create(req.body);
        res.status(201).json({ mensaje: "Película creada exitosamente", nuevaPelicula });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la película", error });
    }
});

app.post('/api/v1/Series', verificarToken, async (req, res) => {
    try {
        const nuevaSerie = await Serie.create(req.body);
        res.status(201).json({ mensaje: "Serie creada exitosamente", nuevaSerie });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la serie", error });
    }
});

// Ruta para comentar
app.post('/api/v1/comentar', async (req, res) => {
    const { ID_PERSONA, COMENTARIO, NOMBRE_ITEM } = req.body;
    const usuario = await Usuario.findOne({ where: { id: ID_PERSONA } });
    if (!usuario) {
        return res.status(400).json({ mensaje: "Error al enviar COMENTARIO" });
    }
    if (COMENTARIO.trim() === '' || !COMENTARIO)
        return res.status(400).json({ mensaje: "Comentario vacío" });
    
    let item = await Pelicula.findOne({ where: { NOMBRE_COMPLETO: NOMBRE_ITEM } });
    if (!item) {
        item = await Serie.findOne({ where: { NOMBRE_COMPLETO: NOMBRE_ITEM } });
        if (!item)
            return res.status(400).json({ mensaje: "No se pudo encontrar el nombre para el item" });
    }
    const comentar = await Comentarios.create({
        id_usuario: ID_PERSONA,
        comentario: COMENTARIO,
        nombre_item: NOMBRE_ITEM
    });
    res.json(comentar);
});

app.get('/api/v1/comentarios/:item', async (req, res) => {
    const comentarios_item = await Comentarios.findAll({
        where: { nombre_item: decodeURIComponent(req.params.item) },
        include: [{ model: Usuario, as: 'usuario', attributes: ['nombre_usuario'] }]
    });
    if (comentarios_item.length === 0)
        return res.status(200).json({ mensaje: "No hay comentarios" });
    const todos_comentarios = comentarios_item.map(comentario => ({
        nombre_usuario: comentario.usuario ? comentario.usuario.nombre_usuario : 'Invitado',
        comentario: comentario.comentario,
        nombre_item: comentario.nombre_item
    }));
    res.status(200).json(todos_comentarios);
});

// Ruta para actualizar un contenido (película o serie) – se requiere token
app.put('/api/v1/Contenido/:nombre', verificarToken, async (req, res) => {
    const nombre = decodeURIComponent(req.params.nombre);
    const nuevoContenido = req.body;
    
    try {
        // Buscar en la tabla de Películas
        let pelicula = await Pelicula.findOne({ where: { NOMBRE_COMPLETO: nombre } });
        if (pelicula) {
            await pelicula.update(nuevoContenido);
            return res.status(200).json({ mensaje: "Película actualizada correctamente", pelicula });
        }
        // Si no es película, buscar en la tabla de Series
        let serie = await Serie.findOne({ where: { NOMBRE_COMPLETO: nombre } });
        if (serie) {
            await serie.update(nuevoContenido);
            return res.status(200).json({ mensaje: "Serie actualizada correctamente", serie });
        }
        // Si no se encuentra en ninguno
        return res.status(404).json({ mensaje: "Contenido no encontrado" });
    } catch (error) {
        console.error("Error al actualizar:", error);
        res.status(500).json({ mensaje: "Error al actualizar el contenido", error });
    }
});

// Ruta para eliminar un contenido (película o serie) – se requiere token
app.delete('/api/v1/Contenido/:nombre', verificarToken, async (req, res) => {
    const nombre = decodeURIComponent(req.params.nombre);
    try {
        // Buscar en la tabla de Películas
        let pelicula = await Pelicula.findOne({ where: { NOMBRE_COMPLETO: nombre } });
        if (pelicula) {
            await pelicula.destroy();
            return res.status(200).json({ mensaje: "Película eliminada correctamente" });
        }
        // Si no es película, buscar en la tabla de Series
        let serie = await Serie.findOne({ where: { NOMBRE_COMPLETO: nombre } });
        if (serie) {
            await serie.destroy();
            return res.status(200).json({ mensaje: "Serie eliminada correctamente" });
        }
        return res.status(404).json({ mensaje: "Contenido no encontrado" });
    } catch (error) {
        console.error("Error al eliminar contenido:", error);
        res.status(500).json({ mensaje: "Error al eliminar el contenido", error });
    }
});

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ mensaje: 'No se proporciona el token' });
    }
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }
        req.usuario = decoded;
        next();
    });
}

// Sincronizar base de datos y arrancar servidor
sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor en http://localhost:${PORT}`);
        });
    })
    .catch(error => console.error('Error al sincronizar la base de datos:', error));
