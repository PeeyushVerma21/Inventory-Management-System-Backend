import { Router } from 'express';
import { getLowStock } from '../controllers/inventoryController.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.get('/low-stock', authMiddleware(), getLowStock);

export default router;
