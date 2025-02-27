# APIRest

Microservicio API REST creado con **Node.js**, **Fastify**, **PostgreSQL** y **Docker**.  
Desplegado en la nube con **Railway**.

## Descripción

Este proyecto es un microservicio que expone endpoints REST para gestionar usuarios y vehículos.  
Incluye un sistema de base de datos relacional (PostgreSQL), pruebas con Postman y configuración para Docker y Railway.

## Características

- **Node.js (Fastify)** para crear la API REST.
- **PostgreSQL** como base de datos.
- **Docker** para contenedores (localmente).
- **Railway** para despliegue en la nube.
- Endpoints REST (GET, POST, PUT, DELETE) para `usuarios` y `vehiculos`.

## Tecnologías

- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Railway](https://railway.app/)

## Requisitos

1. **Node.js** v18 o superior
2. **Docker** (opcional para entorno local)
3. **Git** (para clonar el repositorio)
4. **Postman** (para probar los endpoints)

## Instalación y Uso (Local)

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/TuUsuario/APIRest.git
   cd APIRest

2. Instala dependencias:
   ```bash
   npm install

4. Crea el archivo .env
   ```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=123
   DB_NAME=API

6. Inicia el servidor localmente:
   ```bash
   npm run start

8. Accede a la API en http://localhost:3000.



