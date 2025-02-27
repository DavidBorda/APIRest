const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("API", "postgres", "123", {
  host: "db", // Usa "localhost" si estás fuera de Docker
  dialect: "postgres"
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida correctamente.");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
}

testConnection();
