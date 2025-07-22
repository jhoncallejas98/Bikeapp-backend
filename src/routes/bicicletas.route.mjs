import { Router } from "express";
import { getAllBikes } from "../controller/bikes.controllers.mjs";
const router = Router();

router.get('/bicicletas', getAllBikes);

export default router; 