const express = require('express');
const cors = require('cors');
const { sequelize, Pelicula, Serie, Usuario } = require('./models');

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

// Obtener películas o series (solo públicas o privadas según el tipo)
app.get('/api/v1/Biblioteca/:tipo', async (req, res) => {
    const tipo = req.params.tipo;
    let coleccion;
    if (tipo === "Peliculas") {
        coleccion = await Pelicula.findAll();
    } else if (tipo === "Series") {
        coleccion = await Serie.findAll();
    } else {
        return res.status(400).json({ error: "Tipo no válido" });
    }

    const privado = coleccion.filter(item => item.ACCESO === "PRIVADO");
    res.json(privado.length ? privado : { mensaje: "Crea tu propia lista" });
});

// Obtener todas las películas públicas
app.get('/api/v1/Peliculas', async (req, res) => {
    const peliculas = await Pelicula.findAll({ where: { ACCESO: "PUBLICO" } });
    res.status(201).json({ respuesta: peliculas.length ? peliculas : { mensaje: "No hay películas disponibles" } });
});

// Obtener una película por nombre
app.get('/api/v1/Peliculas/:nombre', async (req, res) => {
    const nombre = decodeURIComponent(req.params.nombre);
    const pelicula = await Pelicula.findOne({ where: { NOMBRE_COMPLETO: nombre } });
    if (!pelicula) return res.status(404).json({ mensaje: "Película no encontrada" });
    res.json(pelicula);
});

// Obtener todas las series públicas
app.get('/api/v1/Series', async (req, res) => {
    const series = await Serie.findAll({ where: { ACCESO: "PUBLICO" } });
    res.status(201).json({ respuesta: series.length ? series : { mensaje: "No hay series disponibles" } });
});

// Obtener una serie por nombre
app.get('/api/v1/Series/:nombre', async (req, res) => {
    const nombre = decodeURIComponent(req.params.nombre);
    const serie = await Serie.findOne({ where: { NOMBRE_COMPLETO: nombre } });
    if (!serie) return res.status(404).json({ mensaje: "Serie no encontrada" });
    res.json(serie);
});

// Obtener datos de usuario
app.get('/api/v1/cuentas/:usuario', async (req, res) => {
    const cuenta = await Usuario.findOne({ where: { nombre_usuario: req.params.usuario } });
    if (!cuenta) return res.status(400).json({ mensaje: "Usuario no encontrado" });
    res.json(cuenta);
});


// Inicio de sesión con verificación de contraseña
app.post('/api/v1/inicio', async (req, res) => {
    const { us, clave } = req.body;
    // Buscar el usuario por nombre de usuario
    const cuenta = await Usuario.findOne({ where: { nombre_usuario: us } });
    if (!cuenta) return res.status(400).json({ mensaje: "Usuario no encontrado" });

    if (clave != cuenta.clave) return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    res.status(200).json(cuenta);
});

app.put('/api/v1/cuenta/:us',async (req,res)=>{
    const { CLAVE , NUEVA_CLAVE, NOMBRE, APELLIDO, GENERO, CORREO, TEL } = req.body;
    let cuenta = await Usuario.findOne({ where: { nombre_usuario: req.params.us }});
    if(!cuenta) return res.status(404).json({ mensaje: "Error. No se pudo encontrar la cuenta" });
    if(CLAVE && NUEVA_CLAVE){
        if(cuenta.clave === CLAVE && NUEVA_CLAVE.trim()!==''){
            cuenta.clave = NUEVA_CLAVE;
        }else{
           return res.status(400).json({mensaje: "Contraseña y/o Nueva contraseña invalida"});
        }
    }
    cuenta.nombre=NOMBRE.trim()==''? cuenta.nombre: NOMBRE;
    cuenta.apellido=APELLIDO.trim()==''?cuenta.apellido:APELLIDO;
    cuenta.genero=GENERO.trim()==''? cuenta.genero: GENERO;
    cuenta.email=CORREO.trim()==''? cuenta.email:CORREO;
    cuenta.telefono= TEL.trim()==''? cuenta.telefono:TEL;
    await cuenta.save();
    res.status(200).json(cuenta);
})

app.delete('/api/v1/cuenta/:usuario', async (req,res)=>{
    try{
        const cuenta = await Usuario.findOne({ where: { nombre_usuario: req.params.usuario } });
        if(!cuenta) 
            return res.status(404).json({mensaje: "Error. No se pudo encontro la cuenta"});
        await cuenta.destroy(); 
        res.status(200).json(cuenta);
    }catch (error) {
        console.error("Error al eliminar la cuenta:", error);
        res.status(500).json({ mensaje: "Error al eliminar la cuenta" });
    }

})

// Sincronizar base de datos y arrancar servidor
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor en http://localhost:${PORT}`);
        });
    })
    .catch(error => console.error('Error al sincronizar la base de datos:', error));
