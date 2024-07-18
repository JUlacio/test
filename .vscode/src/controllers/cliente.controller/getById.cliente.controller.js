import { Clientes } from "../../models/cliente.model.js";

export const clienteById = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const findOne = await Clientes.findByPk(clienteId);
    if (findOne) {
      res.status(200).json({ status: "success", cliente: findOne });
    } else {
      res
        .status(404)
        .json({ status: "error", mensaje: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al listar cliente",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};
