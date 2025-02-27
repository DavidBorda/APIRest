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

## Requisitos
**Uso con Docker (Local)**
1. Tener Docker instalado.
2. En la raíz del proyecto, ejecutar:
   ```bash
   docker-compose up --build
Docker levantará:
Un contenedor para PostgreSQL

Un contenedor para la API
La API estará disponible en http://localhost:3000.

## Despliegue en Railway
- 1.Subir el repositorio a GitHub.
- 2. En Railway, crea un New Project y selecciona tu repo.
- 3. Configura las variables de entorno (por ejemplo, DATABASE_URL) con la URL que te da Railway para PostgreSQL.
- 4. Ajusta el Start Command si necesitas correr migraciones antes de arrancar (npm run migrate && npm run start).
- 5. Railway generará una URL pública (algo como https://apirest-production-xxxx.up.railway.app) para tu API.

## Endpoints Principales
| Método |	Ruta        |	Descripción                  |
|--------|--------------|---------------------------------
|GET	   | /usuarios    |Retorna la lista de usuarios   |
|POST	   |/usuarios	   |Crea un nuevo usuario          | 
|GET	   |/usuarios/:id |Retorna un usuario por ID      |
|PUT	   |/usuarios/:id |Actualiza un usuario           |
|DELETE	|/usuarios/:id |Elimina un usuario             |
|GET	   |/vehiculos	   |Retorna la lista de vehículos  | 
|POST	   |/vehiculos	   |Crea un nuevo vehículo         |
|GET	   |/vehiculos/:id|Retorna un vehículo por ID     |
|PUT	   |/vehiculos/:id|Actualiza un vehículo          |
|DELETE	|/vehiculos/:id|Elimina un vehículo            | 

## Postman
Importa la colección en Postman para probar los endpoints (GET, POST, PUT, DELETE).
## Autor
- **David Borda** - Desarrollador del Proyecto

## Despligue RailWay
La API se encuentra desplegada en Railway se puede acceder desde:
 ```bash
https://apirest-production-d046.up.railway.app/usuarios






