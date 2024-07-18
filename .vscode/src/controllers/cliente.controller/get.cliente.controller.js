import { Clientes } from "../../models/cliente.model.js";

export const listaClientes = async (req, res) => {
  try {
    const lista = await Clientes.findAll();

    res.status(201).json({ status: "success", cantidad: lista.length, lista });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al listar cliente",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};
