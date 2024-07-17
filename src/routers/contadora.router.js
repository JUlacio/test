import express from "express";
import {registroContadora,listaContadora,} from "../controllers/contadora.controller/post.contadora.controller.js";

const router = express.Router();

router.get("/listaContadora", listaContadora);
router.post("/registroContadora", registroContadora);

export default router;
