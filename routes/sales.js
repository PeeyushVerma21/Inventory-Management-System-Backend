import { Router } from 'express';
import { recordSale } from '../controllers/saleController.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.post('/', authMiddleware(), recordSale);

export default router;
