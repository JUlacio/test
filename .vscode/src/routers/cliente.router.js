import express from "express";
const router = express.Router();

import { registroClientes } from "../controllers/cliente.controller/post.cliente.controller.js";
import { listaClientes } from "../controllers/cliente.controller/get.cliente.controller.js";
import { clienteById } from "../controllers/cliente.controller/getById.cliente.controller.js";
import { actualizarCliente } from "../controllers/cliente.controller/update.cliente.controller.js";
import { borrarCliente } from "../controllers/cliente.controller/delete.cliente.controller.js";

router.get("/listaClientes", listaClientes);
router.get("/cliente/:clienteId?", clienteById);
router.put("/actualizar/:clienteId?", actualizarCliente);
router.delete("/borrar/:clienteId?", borrarCliente);
router.post("/registroClientes", registroClientes);

export default router;
