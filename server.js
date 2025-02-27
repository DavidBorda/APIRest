require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const db = require('./db');

// Rutas para la tabla usuarios

const { Usuario } = require("./models"); // Importamos el modelo

fastify.get("/usuarios", async (request, reply) => {
  try {
    console.log("GET /usuarios ejecutado"); // Log de depuración
    const usuarios = await Usuario.findAll();
    console.log("Usuarios obtenidos:", usuarios); // Verifica si realmente obtiene usuarios
    reply.send(usuarios);
  } catch (error) {
    console.error("Error en GET /usuarios:", error);
    reply.status(500).send({ error: "Error al obtener usuarios", detalle: error.message });
  }
});

fastify.get("/usuarios/:id", async (request, reply) => {
  try {
    const { id } = request.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return reply.status(404).send({ error: "Usuario no encontrado" });
    }

    reply.send(usuario);
  } catch (error) {
    reply.status(500).send({ error: "Error al obtener el usuario", detalle: error.message });
  }
});



fastify.post("/usuarios", async (request, reply) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, contacto, vehiculo } = request.body;

    // Insertar el usuario en la base de datos
    const nuevoUsuario = await Usuario.create({ nombre, contacto, vehiculo });

    reply.status(201).send(nuevoUsuario); // Responder con el usuario creado
  } catch (error) {
    reply.status(500).send({ error: "Error al insertar usuario", detalle: error.message });
  }
});


fastify.put("/usuarios/:id", async (request, reply) => {
  try {
    const { id } = request.params;
    const { nombre, contacto, vehiculo } = request.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return reply.status(404).send({ error: "Usuario no encontrado" });
    }

    await usuario.update({ nombre, contacto, vehiculo });

    reply.send(usuario);
  } catch (error) {
    reply.status(500).send({ error: "Error al actualizar usuario", detalle: error.message });
  }
});

fastify.delete("/usuarios/:id", async (request, reply) => {
  try {
    const { id } = request.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return reply.status(404).send({ error: "Usuario no encontrado" });
    }

    await usuario.destroy();

    reply.send({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    reply.status(500).send({ error: "Error al eliminar usuario", detalle: error.message });
  }
});

// endpoint para la segunda tabla ------------------------------------------
const { Vehiculo } = require("./models"); // Importamos el modelo
fastify.get("/vehiculos", async (request, reply) => {
  try {
    const vehiculos = await Vehiculo.findAll();
    reply.send(vehiculos);
  } catch (error) {
    reply.status(500).send({ error: "Error al obtener vehículos", detalle: error.message });
  }
});

fastify.get("/vehiculos/:id", async (request, reply) => {
  try {
    const { id } = request.params;
    const vehiculo = await Vehiculo.findByPk(id);

    if (!vehiculo) {
      return reply.status(404).send({ error: "Vehículo no encontrado" });
    }

    reply.send(vehiculo);
  } catch (error) {
    reply.status(500).send({ error: "Error al obtener el vehículo", detalle: error.message });
  }
});

fastify.post("/vehiculos", async (request, reply) => {
  try {
    console.log("Datos recibidos:", request.body); // 🔍 Verifica lo que llega

    const { usuarioId, placa, marca, modelo } = request.body;

    if (!usuarioId || !marca) {
      return reply.status(400).send({ error: "usuarioId y marca son obligatorios" });
    }

    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return reply.status(404).send({ error: "Usuario no encontrado" });
    }

    const nuevoVehiculo = await Vehiculo.create({ usuarioId, placa, marca, modelo });

    reply.status(201).send(nuevoVehiculo);
  } catch (error) {
    reply.status(500).send({ error: "Error al insertar vehículo", detalle: error.message });
  }
});

fastify.put("/vehiculos/:id", async (request, reply) => {
  try {
    const { id } = request.params;
    const { placa, modelo, color, usuarioId } = request.body;

    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) {
      return reply.status(404).send({ error: "Vehículo no encontrado" });
    }

    await vehiculo.update({ placa, modelo, color, usuarioId });

    reply.send(vehiculo);
  } catch (error) {
    reply.status(500).send({ error: "Error al actualizar vehículo", detalle: error.message });
  }
});


fastify.delete("/vehiculos/:id", async (request, reply) => {
  try {
    const { id } = request.params;
    const vehiculo = await Vehiculo.findByPk(id);

    if (!vehiculo) {
      return reply.status(404).send({ error: "Vehículo no encontrado" });
    }

    await vehiculo.destroy();

    reply.send({ mensaje: "Vehículo eliminado correctamente" });
  } catch (error) {
    reply.status(500).send({ error: "Error al eliminar vehículo", detalle: error.message });
  }
});


// Iniciar servidor
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Servidor corriendo en http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

fastify.get('/test-db', async (request, reply) => {
  try {
    const result = await db.any('SELECT * FROM public."Usuarios"');
    reply.send(result);
  } catch (error) {
    reply.status(500).send({ error: 'Error consultando la base de datos', detalle: error.message });
  }
});

start();
