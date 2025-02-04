const express = require('express');
const cors = require('cors');
const app = express();
const busquedaRoutes = require('./routes/busqueda');
const { sequelize } = require('./models');  

app.use(cors());
app.use(express.json());
app.use('/busqueda', busquedaRoutes);

const PORT = 3000;

// Sincroniza la base de datos antes de iniciar el servidor
sequelize.sync({ force: false })  // `force: false` para evitar borrar los datos existentes
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
