import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Contadoras = sequelize.define("contadoras", {
  id_contadora: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clienteID: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Contadora",
  },
});
