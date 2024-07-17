import { Clientes } from "../../models/cliente.model.js";

export const actualizarCliente = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const cliente = await Clientes.findByPk(clienteId);
    if (!cliente) {
      return res
        .status(404)
        .json({ status: "error", mensaje: "Cliente no encontrado" });
    }
    const { nombre } = req.body;
    await cliente.update({ nombre });
    res
      .status(200)
      .json({ status: "success", mensaje: "Cliente actualizado", cliente });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar cliente",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};
