import { Router } from "express";
// Asegúrate de tener la función devolverBook en tu controlador
import { devolverBook } from "../controller/book.controllers.mjs";
const router = Router();

router.post('/devolver', devolverBook);

export default router; 