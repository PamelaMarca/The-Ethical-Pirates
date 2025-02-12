const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { sequelize, Pelicula, Serie, Usuario } = require('./models');

const app = express();
const busquedaRoutes = require('./routes/busqueda');
const registroRoutes = require('./routes/registro');

app.use(cors());
app.use(express.json());
app.use('/busqueda', busquedaRoutes);
app.use('/api/v1', registroRoutes);

const PORT = 3000;

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        mensaje: "¡Bienvenido! Buscá, guardá o subí tus películas y series favoritas. Regístrate o inicia sesión para empezar."
    });
});

// Obtener películas o series (solo privadas)
app.get('/api/v1/Biblioteca/:tipo', async (req, res) => {
    try {
        const tipo = req.params.tipo;
        let coleccion;

        if (tipo === "Peliculas") {
            coleccion = await Pelicula.findAll({ where: { ACCESO: "PRIVADO" } });
        } else if (tipo === "Series") {
            coleccion = await Serie.findAll({ where: { ACCESO: "PRIVADO" } });
        } else {
            return res.status(400).json({ error: "Tipo no válido" });
        }

        res.json(coleccion.length ? coleccion : { mensaje: "Crea tu propia lista" });
    } catch (error) {
        console.error("Error al obtener la biblioteca:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

// Obtener todas las películas públicas
app.get('/api/v1/Peliculas', async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll({ where: { ACCESO: "PUBLICO" } });
        res.json(peliculas.length ? peliculas : { mensaje: "No hay películas disponibles" });
    } catch (error) {
        console.error("Error al obtener películas:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

// Obtener una película por nombre
app.get('/api/v1/Peliculas/:nombre', async (req, res) => {
    try {
        const nombre = decodeURIComponent(req.params.nombre);
        const pelicula = await Pelicula.findOne({ where: { NOMBRE_COMPLETO: nombre } });

        if (!pelicula) return res.status(404).json({ mensaje: "Película no encontrada" });

        res.json(pelicula);
    } catch (error) {
        console.error("Error al buscar película:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

// Obtener todas las series públicas
app.get('/api/v1/Series', async (req, res) => {
    try {
        const series = await Serie.findAll({ where: { ACCESO: "PUBLICO" } });
        res.json(series.length ? series : { mensaje: "No hay series disponibles" });
    } catch (error) {
        console.error("Error al obtener series:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

// Obtener una serie por nombre
app.get('/api/v1/Series/:nombre', async (req, res) => {
    try {
        const nombre = decodeURIComponent(req.params.nombre);
        const serie = await Serie.findOne({ where: { NOMBRE_COMPLETO: nombre } });

        if (!serie) return res.status(404).json({ mensaje: "Serie no encontrada" });

        res.json(serie);
    } catch (error) {
        console.error("Error al buscar serie:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

// Obtener datos de usuario (sin devolver contraseña)
app.get('/api/v1/cuentas/:usuario', async (req, res) => {
    try {
        const cuenta = await Usuario.findOne({
            where: { nombre_usuario: req.params.usuario },
            attributes: { exclude: ['clave'] } // No devolver la contraseña
        });

        if (!cuenta) return res.status(404).json({ mensaje: "Usuario no encontrado" });

        res.json(cuenta.dataValues);
    } catch (error) {
        console.error("Error al buscar cuenta:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

// Ruta para el registro de usuario
app.post('/api/v1/registro', async (req, res) => {
    const { NOMBRE, APELLIDO, FECHA_NACIMIENTO, GENERO, CORREO, CONTACTO, NOMBRE_USUARIO, CLAVE } = req.body;
    
    try {
        const nuevoUsuario = await Usuario.create({
            nombre: NOMBRE,
            apellido: APELLIDO,
            fecha_nacimiento: FECHA_NACIMIENTO,
            genero: GENERO,
            email: CORREO,
            telefono: CONTACTO,
            nombre_usuario: NOMBRE_USUARIO,
            clave: CLAVE
        });

        res.status(200).json({ mensaje: 'Registro exitoso' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrió un error al registrar' });
    }
});

// Ruta para inicio de sesión
app.post('/api/v1/inicio', async (req, res) => {
    try {
        const { us, clave } = req.body;

        // Buscar el usuario por nombre de usuario
        const cuenta = await Usuario.findOne({ 
            where: { nombre_usuario: us },
            attributes: ['id', 'nombre', 'apellido', 'fecha_nacimiento', 'genero', 'email', 'telefono', 'clave']  
        });

        if (!cuenta) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }

        // Comparar la contraseña directamente (sin cifrar)
        if (clave !== cuenta.clave) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const token = jwt.sign({ usuario: cuenta.nombre_usuario }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ mensaje: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

// Ruta protegida que requiere autenticación
app.get('/api/v1/perfil', verificarToken, async (req, res) => {
    try {
        // Usar el 'req.usuario' que contiene el payload del token
        const usuario = await Usuario.findOne({ where: { nombre_usuario: req.usuario.usuario } });
        res.status(200).json({ usuario });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener perfil' });
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
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor en http://localhost:${PORT}`);
        });
    })
    .catch(error => console.error('Error al sincronizar la base de datos:', error));
