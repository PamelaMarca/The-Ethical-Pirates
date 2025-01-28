const express = require("express");
const sequelize = require("./routes/database");
const Pelicula = require("./models/Pelicula");
const Serie = require("./models/Serie");
const Link = require("./models/Link");
const { fetchData } = require("./services/apiService");

const app = express();
app.use(express.json()); // Middleware para manejar JSON

// Importar y usar las rutas
const serieRoutes = require("./routes/seriesRoutes");
const peliculaRoutes = require("./routes/peliculaRoutes");
app.use("/api/series", serieRoutes);
app.use("/api/peliculas", peliculaRoutes);

// Ruta de prueba para verificar conexión
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente.");
});

// Sincronizar base de datos y arrancar el servidor
sequelize.sync({ force: false }).then(async () => {
    console.log("Base de datos sincronizada.");
    
    app.listen(3000, () => {
        console.log("Servidor corriendo en http://localhost:3000");
    });
});
