import { Router } from "express";
import { createStation, getAllStations, getTodayStationById, updateStationById, removeTodayStationById } from "../controller/station.controllers.mjs";

const router = Router();

router.post('/api/station', createStation);
router.get('/api/station', getAllStations);
router.get('/api/station/:id', getTodayStationById);
router.put('/api/station/:id', updateStationById);
router.delete('/api/station/:id', removeTodayStationById);

export default router;
