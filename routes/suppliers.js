import { Router } from 'express';
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
} from '../controllers/supplierController.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.post('/', authMiddleware(), createSupplier);
router.get('/', authMiddleware(), getSuppliers);
router.get('/:id', authMiddleware(), getSupplierById);
router.put('/:id', authMiddleware(), updateSupplier);
router.delete('/:id', authMiddleware(), deleteSupplier);

export default router;
