# Imagen de Node.js
FROM node:18

WORKDIR /app

COPY package*.json ./
COPY . .

# Dependencias
RUN npm install

# Puerto
EXPOSE 3000

# Ejecutar la app
CMD ["node", "server.js"]
