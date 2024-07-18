import { Contadoras } from "../../models/cliente.model.js";

export const registroContadora = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Faltan campos requeridos: nombre, email, y password" });
  }

  try {
    const nuevaContadora = await Contadoras.create({ nombre, email, password });
    res.status(201).json(nuevaContadora);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: "El correo electrónico ya está en uso" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const listaContadora = async (req, res) => {
  try {
    const nuevaLista = await Contadoras.findAll();
    res.status(201).json({ nuevaLista: nuevaLista });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
