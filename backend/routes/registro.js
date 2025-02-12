const express = require('express');
const router = express.Router();
const { Usuario } = require('../models'); 
// Ruta para registrar usuario 
router.post('/registro', async (req, res) => {
    console.log("Datos recibidos en el backend:", req.body);
    try {
        const {
            NOMBRE,
            APELLIDO,
            FECHA_NACIMIENTO,
            GENERO,
            CORREO,
            CONTACTO,
            NOMBRE_USUARIO,
            CLAVE
        } = req.body;
    
        if (!NOMBRE || !APELLIDO || !NOMBRE_USUARIO || !CLAVE) {
            return res.status(400).json({ mensaje: "Complete los campos obligatorios" });
        }
        // Verificar si el nombre de usuario ya existe en la base de datos
        const usuarioExistente = await Usuario.findOne({ where: { nombre_usuario: USUARIO_NOMBRE } });

        if (usuarioExistente) {
            return res.status(400).json({ mensaje: "El nombre de usuario ya existe" });
        }

        // Crear el usuario con los datos recibidos
        const nuevoUsuario = await Usuario.create({
            nombre: NOMBRE,
            apellido: APELLIDO,
            fecha_nacimiento: FECHA_NACIMIENTO,
            genero: GENERO,
            email: CORREO,
            telefono: CONTACTO,
            nombre_usuario: USUARIO_NOMBRE,
            clave: CLAVE,
        });            
        console.log("Nuevo usuario insertado:", nuevoUsuario);
        res.json(nuevoUsuario);
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

module.exports = router;