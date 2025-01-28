# Usamos una imagen base de Node.js
FROM node:16

# Definimos el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiamos los archivos del backend al contenedor
COPY . .

# Instalamos las dependencias de Node.js
RUN npm install

# Exponemos el puerto 5000 para la API
EXPOSE 5000

# Iniciamos la aplicación
CMD ["node", "app.js"]
