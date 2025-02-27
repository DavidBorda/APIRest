require('dotenv').config();
const pgp = require('pg-promise')();

const db = pgp({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Necesario en Railway
    }
});

db.connect()
  .then(obj => {
    console.log("✅ Conectado a PostgreSQL");
    obj.done(); // Cierra la conexión
  })
  .catch(error => {
    console.error("❌ Error conectando a PostgreSQL:", error);
  });

module.exports = db;

