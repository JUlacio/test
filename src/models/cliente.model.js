import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import { Contadoras } from "./contadora.model.js";

// models/cliente.model.js

const Clientes = sequelize.define("clientes", {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_materno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_paterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_contadora: {
    type: DataTypes.INTEGER,
    references: {
      model: "contadoras",
      key: "id_contadora",
    },
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Cliente",
  },
});

Contadoras.hasMany(Clientes, { foreignKey: "id_contadora" });
Clientes.belongsTo(Contadoras, { foreignKey: "id_contadora" });

export { Contadoras, Clientes };
