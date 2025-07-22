import { Router } from "express";
import { createBook, getAllBooks, getBooksById, updateBookById, removeBookById } from "../controller/book.controllers.mjs";

const router = Router();

router.post('/api/book', createBook);
router.get('/api/book', getAllBooks);
router.get('/api/book/:id', getBooksById);
router.put('/api/book/:id', updateBookById);
router.delete('/api/book/:id', removeBookById);

export default router;
