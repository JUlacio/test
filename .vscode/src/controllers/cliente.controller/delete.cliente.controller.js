import { Clientes } from "../../models/cliente.model.js";

export const borrarCliente = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const cliente = await Clientes.findByPk(clienteId);
    if (!cliente) {
      return res
        .status(404)
        .json({ status: "error", mensaje: "Cliente no encontrado" });
    }
    await cliente.destroy();
    res.status(200).json({ status: "success", mensaje: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar cliente",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};
