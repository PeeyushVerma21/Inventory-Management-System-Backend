import { Router } from 'express';
import { createShipment } from '../controllers/shipmentController.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.post('/', authMiddleware(), createShipment);


export default router;
