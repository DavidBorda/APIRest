require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const db = require('./db');

// Rutas
fastify.get('/usuarios', async (request, reply) => {
    try {
        const users = await db.any('SELECT * FROM usuarios'); // Correcto
        reply.send(users); 
    } catch (error) {
        reply.status(500).send({ error: 'Error obteniendo usuarios', detalle: error.message });
    }
});

fastify.post('/usuarios', async (request, reply) => {
    const { nombre, contacto, vehiculo } = request.body;
    try {
        const newUser = await db.one(
            'INSERT INTO usuarios(nombre, contacto, vehiculo) VALUES($1, $2, $3) RETURNING *',
            [nombre, contacto, vehiculo]
        );
        reply.send(newUser);
    } catch (error) {
        reply.status(500).send({ error: 'Error insertando usuario', detalle: error.message });
    }
});

fastify.put('/usuarios/:id', async (request, reply) => {  
    const { id } = request.params;
    const { nombre, contacto, vehiculo } = request.body;

    try {
        // Obtener el usuario
        const user = await db.oneOrNone('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (!user) {
            return reply.status(404).send({ error: 'Usuario no encontrado' });
        }

        // Actualizar usuario con valores nuevos o mantener los anteriores
        await db.none(
            'UPDATE usuarios SET nombre=$1, contacto=$2, vehiculo=$3 WHERE id=$4',  
            [nombre || user.nombre, contacto || user.contacto, vehiculo || user.vehiculo, id]  
        );

        reply.send({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
        reply.status(500).send({ error: 'Error al actualizar el usuario', detalle: error.message });
    }
});

fastify.delete('/usuarios/:id', async (request, reply) => {
    const { id } = request.params;

    try {
        // Verificar si el usuario existe
        const user = await db.oneOrNone('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (!user) {
            return reply.status(404).send({ error: 'Usuario no encontrado' });
        }

        // Eliminar usuario
        await db.none('DELETE FROM usuarios WHERE id = $1', [id]);

        reply.send({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        reply.status(500).send({ error: 'Error al eliminar el usuario', detalle: error.message });
    }
});

// endpoint para la segunda tabla ------------------------------------------
fastify.get('/vehiculos', async (request, reply) => {
    try {
        const vehiculos = await db.any('SELECT * FROM vehiculos');
        reply.send(vehiculos);
    } catch (error) {
        reply.status(500).send({ error: 'Error al obtener los vehículos', detalle: error.message });
    }
});

fastify.get('/usuarios/:id/vehiculos', async (request, reply) => {
    try {
        const { id } = request.params;
        const vehiculos = await db.any('SELECT * FROM vehiculos WHERE usuario_id = $1', [id]);
        reply.send(vehiculos);
    } catch (error) {
        reply.status(500).send({ error: 'Error al obtener los vehículos del usuario', detalle: error.message });
    }
});

fastify.post('/vehiculos', async (request, reply) => {
    try {
        const { usuario_id, placa, marca, modelo } = request.body;
        const nuevoVehiculo = await db.one(
            'INSERT INTO vehiculos(usuario_id, placa, marca, modelo) VALUES($1, $2, $3, $4) RETURNING *',
            [usuario_id, placa, marca, modelo]
        );
        reply.send(nuevoVehiculo);
    } catch (error) {
        reply.status(500).send({ error: 'Error al registrar el vehículo', detalle: error.message });
    }
});

fastify.put('/vehiculos/:id', async (request, reply) => {
    try {
        const { id } = request.params;
        const { placa, marca, modelo } = request.body;
        const vehiculoActualizado = await db.one(
            'UPDATE vehiculos SET placa=$1, marca=$2, modelo=$3 WHERE id=$4 RETURNING *',
            [placa, marca, modelo, id]
        );
        reply.send(vehiculoActualizado);
    } catch (error) {
        reply.status(500).send({ error: 'Error al actualizar el vehículo', detalle: error.message });
    }
});

fastify.delete('/vehiculos/:id', async (request, reply) => {
    try {
        const { id } = request.params; // Extrae el ID desde la URL

        if (!id) {
            return reply.status(400).send({ error: 'Debes proporcionar un ID válido' });
        }

        const result = await db.result('DELETE FROM vehiculos WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return reply.status(404).send({ error: 'Vehículo no encontrado' });
        }

        reply.send({ message: 'Vehículo eliminado correctamente' });
    } catch (error) {
        reply.status(500).send({ error: 'Error al eliminar el vehículo', detalle: error.message });
    }
});




// Iniciar servidor
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log('Servidor corriendo en http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

fastify.get('/test-db', async (request, reply) => {
  try {
    const result = await db.any("SELECT * FROM public.usuarios");
    reply.send(result);
  } catch (error) {
    reply.status(500).send({ error: 'Error consultando la base de datos', detalle: error.message });
  }
});

start();
