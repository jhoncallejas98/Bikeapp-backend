import stationModel from "../schemas/station.schemas.mjs";
import bikesModel from "../schemas/bikes.schemas.mjs";

// crear una nueva estacion.

const createStation = async (req, res) => {
    try {
        const inputData = req.body;
        const newStation = await stationModel.create(inputData);
        res.status(201).json(newStation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear estacion" });
    }
};

const getAllStations = async (req, res) => {
    try {
        const stations = await stationModel.find({});
        // Para cada estación, buscar las bicicletas disponibles asociadas
        const stationsWithBikes = await Promise.all(stations.map(async (station) => {
            const bikes = await bikesModel.find({ stationId: station._id, status: 'disponible' });
            return {
                ...station.toObject(),
                bikes
            };
        }));
        res.json(stationsWithBikes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener las estaciones" });
    }
};

const getTodayStationById = async (req, res) => {
    try {
        const id = req.params.id;
        const station = await stationModel.findById(id).lean();
        if (!station) {
            return res.status(404).json({ msg: "Estación no encontrada" });
        }
        // Busca las bicis asociadas a la estación
        const bikes = await bikesModel.find({ stationId: id });
        station.bikes = bikes;
        res.json(station);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener estación" });
    }
};

// Actualizar una estación de hoy por ID
const updateStationById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const updatedStation = await stationModel.findByIdAndUpdate(id, inputData, { new: true });
        if (!updatedStation) {
            return res.status(404).json({ msg: "Estación no encontrada para actualizar" });
        }
        res.json(updatedStation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar estación de hoy" });
    }
};

// Eliminar un paciente de hoy por ID
const removeTodayStationById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedStation = await stationModel.findByIdAndDelete(id);
        if (!deletedStation) {
            return res.status(404).json({ msg: "Estación no encontrada para eliminar" });
        }
        res.json({ msg: "Estación eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar estación de hoy" });
    }
};


export { createStation, getAllStations, getTodayStationById, updateStationById, removeTodayStationById };
