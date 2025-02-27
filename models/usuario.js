module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    nombre: DataTypes.STRING,
    contacto: DataTypes.STRING,
    vehiculo: DataTypes.STRING,

  });

  Usuario.associate = (models) => {
    Usuario.hasOne(models.Vehiculo, { foreignKey: "usuarioId" });
  };

  return Usuario;
};
