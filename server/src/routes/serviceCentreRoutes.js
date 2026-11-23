import express from 'express';
import { getServiceCentres, createServiceCentre } from '../controllers/serviceCentreController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', getServiceCentres);
router.post('/', authenticate, requireRole('admin'), createServiceCentre);

export default router;
