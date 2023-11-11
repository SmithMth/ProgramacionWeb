# Usar una imagen base de Node.js
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de archivos de tu aplicación al contenedor
COPY . .

# Establecer el puerto que tu aplicación utilizará
EXPOSE 3000

# El comando para ejecutar tu aplicación
CMD [ "node", "index.js" ]
