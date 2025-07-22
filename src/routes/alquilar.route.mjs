import { Router } from "express";
import { createBook, getAllBooks } from "../controller/book.controllers.mjs";
const router = Router();

router.post('/alquilar', createBook);
router.get('/alquileres', getAllBooks);

export default router; 