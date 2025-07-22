import { Router } from "express";
import  {createBike, getAllBikes, getBikeById, updateBikeById, removeBikeById} from '../controller/bikes.controllers.mjs';

const router = Router();

router.post('/api/bike', createBike);
router.get('/api/bike', getAllBikes);
router.get('/api/bike/:id', getBikeById);
router.put('/api/bike/:id', updateBikeById);
router.delete('/api/bike/:id', removeBikeById);

export default router;
