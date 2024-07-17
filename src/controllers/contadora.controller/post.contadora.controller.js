import { Contadoras } from "../../models/cliente.model.js";

export const registroContadora = async (req, res) => {
  try {
    const contadora = await Contadoras.create(req.body);
    res.status(201).json(contadora);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
