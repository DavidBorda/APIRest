module.exports = (sequelize, DataTypes) => {
  const Vehiculo = sequelize.define("Vehiculo", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Usuarios",
        key: "id",
      },
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Vehiculo.associate = (models) => {
    Vehiculo.belongsTo(models.Usuario, { foreignKey: "usuarioId" });
  };

  return Vehiculo;
};
