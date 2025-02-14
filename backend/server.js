const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { sequelize, Pelicula, Serie, Usuario, Favoritos } = require('./models');

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
    const mensaje = `<div class="css_mensaje">
                        <h2>¡Bienvenido!</h2>
                        <p>Buscá, guardá o subí tus peliculas y series favoritas</p>
                        <p>Regístrate o inicia sesión para empezar</p>
                        <a href="inicio_registro.html" class="boton">Iniciar Sesión/ Registrarse</a>
                    </div>`;
    res.json({ mensaje });
});

// Obtener películas o series (solo públicas o privadas según el tipo)
app.get('/api/v1/Favorito/:id/:tipo', verificarToken, async (req, res) => {
    const tipo = req.params.tipo;
    const usuario = req.params.id;
    
    // const prueba = await Favoritos.findAll({ where: { id_usuario: req.params.id, contenido: 'pelicula' }, include: [{ model: Pelicula, as:'pelicula',attributes:['NOMBRE_COMPLETO']}]});
    // console.log(prueba);
    // res.status(200).json(prueba);

    try{
        let coleccion;
        if (tipo === "Peliculas") {
            coleccion = await Favoritos.findAll({
                where : { id_usuario: usuario ,contenido: 'pelicula'},
                include: [{ model: Pelicula, as: 'pelicula', attributes: ['NOMBRE_COMPLETO']}]
            });
            console.log(coleccion);
        } else if (tipo === "Series") {
            coleccion = await Favoritos.findAll({ 
                where : { id_usuario:usuario, contenido: "serie" },
                include: [{ model: Serie, as: 'serie', attributes: ['NOMBRE_COMPLETO'] }]
            });
        } else {
            return res.status(400).json({ error: "Tipo no válido" });
        }

        if(coleccion.length===0)
            return res.status(200).json({mensaje: "No se encuentran favoritos"});
    
        const lista_favoritos = coleccion.map(fav => ({
            id_usuario: fav.id_usuario,
            contenido: tipo === "pelicula" ? fav.pelicula?.NOMBRE_COMPLETO : fav.serie?.NOMBRE_COMPLETO,
            id_contenido: fav.id_contenido
        }));

        res.status(200).json(lista_favoritos);
    }catch(error){
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener favoritos" });
    }

});

app.post('/api/v1/Favorito', verificarToken, async(req,res)=>{
    const { ID_USUARIO, CONTENIDO, ID_CONTENIDO } = req.body;
    if(!ID_USUARIO || !CONTENIDO || !ID_CONTENIDO)
        return res.status(400).json({ mensaje: "No se logro guardar en favoritos"});
    const yaExiste= await Favoritos.findOne({ where :{ id_usuario:ID_USUARIO, contenido:CONTENIDO, id_contenido: ID_CONTENIDO }});
    if(yaExiste)
        return res.status(400).json({mensaje: "Ya esta en favoritos"});
    const favorito= await Favoritos.create({
        id_usuario: ID_USUARIO,
        contenido: CONTENIDO,
        id_contenido: ID_CONTENIDO,
    });
    res.json(favorito);
})

// Obtener todas las películas públicas
app.get('/api/v1/Peliculas', async (req, res) => {
    const peliculas = await Pelicula.findAll({ where: { ACCESO: "PUBLICO" } });

    res.status(201).json({ respuesta: peliculas.length ? peliculas : { mensaje: "No hay películas disponibles" } });
});

// Obtener una película por nombre
app.get('/api/v1/Contenido/:nombre', async (req, res) => {
    const nombre = decodeURIComponent(req.params.nombre);
    const serie = await Serie.findOne({ where: { NOMBRE_COMPLETO: nombre } });
    const pelicula = await Pelicula.findOne({ where: { NOMBRE_COMPLETO: nombre } });
    if (!pelicula && !serie) 
        return res.status(404).json({ mensaje: "Contenido no encontrada" });
    if(!serie){
        return res.json({ ...pelicula.toJSON(),tipo:"pelicula"});
    }
    if(!pelicula){
        return res.json({ ...serie.toJSON(),tipo:"serie" });
    }
});

// Obtener todas las series públicas
app.get('/api/v1/Series', async (req, res) => {
    const series = await Serie.findAll({ where: { ACCESO: "PUBLICO" } });
    res.status(201).json({ respuesta: series.length ? series : { mensaje: "No hay series disponibles" } });
});


// Obtener datos de usuario (sin devolver contraseña)
app.get('/api/v1/cuentas/:us',verificarToken, async (req, res) => {
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
        const token = jwt.sign({ nombre_usuario: cuenta.nombre_usuario }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ token, cuenta });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

// Ruta protegida que requiere autenticación
app.get('/api/v1/perfil', verificarToken, async (req, res) => {
    try {
        // Usar el 'req.usuario' que contiene el payload del token
        const usuario = await Usuario.findOne({ where: { nombre_usuario: req.usuario.nombre_usuario } });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener perfil' });
    }
});

//modificar cuenta
app.put('/api/v1/cuenta/:usuario',async (req,res)=>{
    const { CLAVE , NUEVA_CLAVE, NOMBRE, APELLIDO, GENERO, CORREO, TEL } = req.body;
    let cuenta = await Usuario.findOne({ where: { nombre_usuario: req.params.usuario }});
    if(!cuenta) return res.status(404).json({ mensaje: "Error. No se pudo encontrar la cuenta" });
    if(CLAVE && NUEVA_CLAVE){
        if(cuenta.clave === CLAVE && NUEVA_CLAVE.trim()!==''){
            cuenta.clave = NUEVA_CLAVE;
        }else{
           return res.status(400).json({ mensaje: "Contraseña y/o Nueva contraseña invalida" });
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

//intentar crear una coneccion

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
};

// Sincronizar base de datos y arrancar servidor
sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor en http://localhost:${PORT}`);
        });
    })
    .catch(error => console.error('Error al sincronizar la base de datos:', error));
