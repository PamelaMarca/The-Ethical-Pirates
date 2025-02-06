const express = require('express');
const router = express.Router();
const { Usuario } = require('../models'); // Usar la destructuración para importar el modelo

// Ruta para registrar usuario
router.post('/registro', async (req, res) => {
    console.log("Datos recibidos en el backend:", req.body);

    const { nombre, apellido, nacimiento, genero, correo, contacto, usuario,clave} = req.body;
    // Validar si se reciben los datos obligatorios
    if (!usuario || !clave ) {
        return res.status(400).json({ mensaje: "Nombre de usuario, clave son obligatorios" });
    }

    try {
        // Verificar si el nombre de usuario ya existe en la base de datos
        const usuarioExistente = await Usuario.findOne({ where: { nombre_usuario: usuario } });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El nombre de usuario ya está en uso.' });
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(clave, 10);
        // Crear el usuario con los datos recibidos
        // Cuando se crea el nuevo usuario, asegúrate de que los campos coincidan
        const usuario = await Usuario.create({
            nombre: nombre,
            apellido: apellido,
            fecha_nacimiento: nacimiento,
            genero: genero,
            email: correo,
            telefono: contacto,
            nombre_usuario: usuario,
            clave: hashedPassword,
        });
        console.log("Nuevo usuario insertado:", nuevoUsuario);
        Usuario.push(usuario);
        res.json({ mensaje: "Usuario registrado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

module.exports = router;
