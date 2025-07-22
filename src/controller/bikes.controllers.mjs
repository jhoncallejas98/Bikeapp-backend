import bikesModel from "../schemas/bikes.schemas.mjs";

// crear una nueva estacion.

const createBike = async (req, res) => {
    res.json(req.body)
    try {
        const inputData = req.body;
        const newBike = await bikesModel.create(inputData);
        res.status(201).json(newBike);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear la bicicleta" });
    }
};

const getAllBikes = async (req, res) => {
    try {
        const data = await bikesModel.find({});
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener las bicicletas" });
    }
};

const getTodayBikeById = async (req, res) => {
    try {
        const id = req.params.id;
        const bike = await bikesModel.findById(id);
        if (!bike) {
            return res.status(404).json({ msg: "Bicicleta no encontrada" });
        }
        res.json(bike);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener bicicleta de hoy" });
    }
};

// Actualizar una bicicleta de hoy por ID
const updateBikeById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const updatedBike = await bikesModel.findByIdAndUpdate(id, inputData, { new: true });
        if (!updatedBike) {
            return res.status(404).json({ msg: "Bicicleta no encontrada para actualizar" });
        }
        res.json(updatedBike);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar bicicleta de hoy" });
    }
};

// Eliminar una bicicleta de hoy por ID
const removeTodayBikeById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBike = await bikesModel.findByIdAndDelete(id);
        if (!deletedBike) {
            return res.status(404).json({ msg: "Bicicleta no encontrada para eliminar" });
        }
        res.json({ msg: "Bicicleta eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar bicicleta de hoy" });
    }
};


export { createBike, getAllBikes, getTodayBikeById, updateBikeById, removeTodayBikeById };
