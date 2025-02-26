require('dotenv').config();
const pgp = require('pg-promise')();

const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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
