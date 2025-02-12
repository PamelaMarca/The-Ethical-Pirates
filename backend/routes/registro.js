// routes/registro.js
const express = require('express');
const router = express.Router();
const { Usuario } = require('../models'); // Asegúrate de que la ruta sea la correcta

router.post('/registro', async (req, res) => {
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
 
     // Verificar si el nombre de usuario ya existe
     const usuarioExistente = await Usuario.findOne({ where: { nombre_usuario: NOMBRE_USUARIO } });
     if (usuarioExistente) {
       return res.status(400).json({ mensaje: "El nombre de usuario ya está en uso" });
     }
 
     // Crear el usuario (inserción en la tabla de Usuarios)
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
 
     return res.status(201).json(nuevoUsuario);
   } catch (error) {
     console.error("Error en el registro:", error);
     return res.status(500).json({ mensaje: "Error al registrar el usuario" });
   }
 }); 

module.exports = router;
