import { Router } from "express";
import { createStation, getAllStations, getTodayStationById as getStationById } from "../controller/station.controllers.mjs";
const router = Router();

router.get('/estaciones', getAllStations);
router.get('/estaciones/:id', getStationById);
router.post('/estaciones', createStation);

export default router; 