import booksModel from "../schemas/book.schemas.mjs";
import bikesModel from "../schemas/bikes.schemas.mjs";
import stationModel from "../schemas/station.schemas.mjs";


// crear una nueva reserva.

const createBook = async (req, res) => {
    try {
        const { user, bike: bikeId, stationSalida, fechaInicio, horaInicio } = req.body;
        // Buscar la bicicleta por ID
        const bike = await bikesModel.findById(bikeId);
        if (!bike) {
            return res.status(404).json({ msg: "Bicicleta no encontrada" });
        }
        if (bike.status === 'en mantenimiento') {
            return res.status(400).json({ msg: "No se puede alquilar una bicicleta en mantenimiento" });
        }
        if (bike.status !== 'disponible' || bike.availableBikes <= 0) {
            return res.status(400).json({ msg: "No hay bicicletas disponibles para alquilar" });
        }
        // Buscar la estación por ID
        const station = await stationModel.findById(stationSalida);
        if (!station) {
            return res.status(404).json({ msg: "Estación no encontrada" });
        }
        if (station.availableBikes <= 0) {
            return res.status(400).json({ msg: "No hay bicicletas disponibles en la estación" });
        }
        // Crear la reserva conectando los IDs
        const newBook = await booksModel.create({
            user,
            bike: bikeId,
            stationSalida,
            fechaInicio,
            horaInicio,
            activo: true
        });
        // Cambiar estado de la bici y restar una disponible en la estación
        bike.status = 'en uso';
        bike.availableBikes -= 1;
        await bike.save();
        station.availableBikes -= 1;
        await station.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear la reserva" });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const data = await booksModel
            .find({})
            .populate('bike')
            .populate('stationSalida');
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

const devolverBook = async (req, res) => {
    try {
        const { alquilerId, stationId } = req.body;
        // Buscar el alquiler activo
        const alquiler = await booksModel.findById(alquilerId);
        if (!alquiler || !alquiler.activo) {
            return res.status(404).json({ msg: "Alquiler no encontrado o ya finalizado" });
        }
        // Buscar la bicicleta
        const bike = await bikesModel.findById(alquiler.bike);
        if (!bike) {
            return res.status(404).json({ msg: "Bicicleta no encontrada" });
        }
        // Cambiar estado de la bici a 'disponible'
        bike.status = 'disponible';
        await bike.save();
        // Sumar una bicicleta disponible en la estación destino
        const station = await stationModel.findById(stationId);
        if (!station) {
            return res.status(404).json({ msg: "Estación destino no encontrada" });
        }
        station.availableBikes += 1;
        await station.save();
        // Finalizar el alquiler
        alquiler.fechaFin = new Date();
        alquiler.activo = false;
        await alquiler.save();
        res.json({ msg: "Bicicleta devuelta correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al devolver bicicleta" });
    }
};


export { createBook, getAllBooks, getBooksById, updateBookById, removeBookById, devolverBook };
