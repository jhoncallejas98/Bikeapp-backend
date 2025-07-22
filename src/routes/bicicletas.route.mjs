import { Router } from "express";
import { getAllBikes, createBike } from "../controller/bikes.controllers.mjs";
const router = Router();

router.get('/bicicletas', getAllBikes);
router.post('/bicicletas', createBike);

export default router; 