import { Router } from 'express';
import { getAuditLogs } from '../controllers/auditLogController.js';
import authMiddleware from '../middleware/auth.js';

const adminOnly = authMiddleware(['admin']);

const router = Router();

router.get('/', adminOnly, getAuditLogs);

export default router;
