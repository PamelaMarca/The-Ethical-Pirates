const express = require('express');
const router = express.Router();
const { Usuario } = require('../models'); // Usar la destructuración para importar el modelo

// Ruta para registrar usuario
router.post('/registro', async (req, res) => {
    console.log("Datos recibidos en el backend:", req.body);

    const { NOMBRE_USUARIO, CLAVE, DATOS } = req.body;

    // Validar si se reciben los datos obligatorios
    if (!NOMBRE_USUARIO || !CLAVE || !DATOS) {
        return res.status(400).json({ mensaje: "Nombre de usuario, clave y datos son obligatorios" });
    }

    try {
        // Verificar si el nombre de usuario ya existe en la base de datos
        const usuarioExistente = await Usuario.findOne({ where: { nombre_usuario: NOMBRE_USUARIO } });

        if (usuarioExistente) {
            return res.status(400).json({ mensaje: "El nombre de usuario ya existe" });
        }

        // Crear el usuario con los datos recibidos
// Cuando se crea el nuevo usuario, asegúrate de que los campos coincidan
        const nuevoUsuario = await Usuario.create({
        nombre_usuario: NOMBRE_USUARIO,
        clave: CLAVE,
        nombre: DATOS.NOMBRE,
        apellido: DATOS.APELLIDO,
        fecha_nacimiento: DATOS.FECHA_NACIMIENTO,
        genero: DATOS.GENERO,
        email: DATOS.EMAIL,
        telefono: DATOS.TEL 
    });
    console.log("Nuevo usuario insertado:", nuevoUsuario);

        res.json({ mensaje: "Usuario registrado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

module.exports = router;
