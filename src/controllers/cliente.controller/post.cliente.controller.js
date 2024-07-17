import { Clientes, Contadoras } from "../../models/cliente.model.js";

export const registroClientes = async (req, res) => {
  const { nombre } = req.body;

  // Validación del campo nombre
  const nombreValido =
    typeof nombre === "string" &&
    /^[a-zA-Z\s]+$/.test(nombre) &&
    nombre.trim() !== "";

  if (!nombreValido) {
    return res.status(400).json({
      error:
        "El nombre es inválido. Debe contener solo letras y no estar vacío.",
    });
  }

  try {
    // Obtén todas las contadoras con sus clientes
    const contadoras = await Contadoras.findAll({
      include: { model: Clientes },
    });

    // Encuentra la contadora con menos clientes
    const contadoraConMenosClientes = contadoras.reduce((prev, curr) =>
      prev.clientes.length < curr.clientes.length ? prev : curr
    );

    // Crea el nuevo cliente y asigna la contadora con menos clientes
    const cliente = await Clientes.create({
      ...req.body,
      id_contadora: contadoraConMenosClientes.id_contadora,
    });

    // Actualiza la lista de contratantes de la contadora
    const updatedContratantes = [
      ...contadoraConMenosClientes.clienteID,
      cliente.id_cliente,
    ];
    await Contadoras.update(
      { clienteID: updatedContratantes },
      { where: { id_contadora: contadoraConMenosClientes.id_contadora } }
    );

    res.status(201).json({ status: "success", cliente });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear cliente",
      errorMensaje: error.message,
      stack: error.stack,
      error,
    });
  }
};
