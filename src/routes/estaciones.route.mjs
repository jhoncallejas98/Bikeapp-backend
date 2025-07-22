import { Router } from "express";
import { getAllStations, getTodayStationById as getStationById } from "../controller/station.controllers.mjs";
const router = Router();

router.get('/estaciones', getAllStations);
router.get('/estaciones/:id', getStationById);

export default router; 