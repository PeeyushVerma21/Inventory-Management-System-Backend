import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.post('/', authMiddleware(), createProduct);
router.get('/', authMiddleware(), getAllProducts);
router.get('/:id', authMiddleware(), getProductById);
router.put('/:id', authMiddleware(), updateProduct);
router.delete('/:id', authMiddleware(), deleteProduct);

export default router;
