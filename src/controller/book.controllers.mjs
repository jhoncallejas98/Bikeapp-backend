import booksModel from "../schemas/book.schemas.mjs";


// crear una nueva reserva.

const createBook = async (req, res) => {
    try {
        const inputData = req.body;
        const newBook = await booksModel.create(inputData);
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear la reserva" });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const data = await booksModel.find({});
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener las resevras" });
    }
};

const getBooksById = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await booksModel.findById(id);
        if (!book) {
            return res.status(404).json({ msg: "reserva no encontrado" });
        }
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener reservas de hoy" });
    }
};

// Actualizar una reserva de hoy por ID
const updateBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const updatebook = await booksModel.findByIdAndUpdate(id, inputData, { new: true });
        if (!updatebook) {
            return res.status(404).json({ msg: "reserva no encontrada para actualizar" });
        }
        res.json(updatebook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar reserva de hoy" });
    }
};

// Eliminar un reserva de hoy por ID
const removeBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBook = await booksModel.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ msg: "reserva no encontrada para eliminar" });
        }
        res.json({ msg: "reserva eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar reserva de hoy" });
    }
};


export { createBook, getAllBooks, getBooksById, updateBookById, removeBookById };
