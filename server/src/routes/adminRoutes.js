import express from 'express';
import {
  getAdminOverview,
  getUsers,
  updateUserRole,
  addDeviceCategory,
  addDeviceModel
} from '../controllers/adminController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// Protect all admin endpoints
router.use(authenticate, requireRole('admin'));

router.get('/overview', getAdminOverview);
router.get('/users', getUsers);
router.patch('/users/:userId/role', updateUserRole);
router.post('/categories', addDeviceCategory);
router.post('/models', addDeviceModel);

export default router;
