import { Router } from "express";
import { createBook } from "../controller/book.controllers.mjs";
const router = Router();

router.post('/alquilar', createBook);

export default router; 