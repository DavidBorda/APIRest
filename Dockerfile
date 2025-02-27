# Usar Node.js como base
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto en el que corre Fastify
EXPOSE 3000

# Comando para ejecutar la API
CMD ["node", "server.js"]
