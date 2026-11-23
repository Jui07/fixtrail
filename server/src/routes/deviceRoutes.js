import express from 'express';
import {
  getCategories,
  getManufacturers,
  getModels,
  getModelBySlug,
  registerUserDevice,
  getUserDevices
} from '../controllers/deviceController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/manufacturers', getManufacturers);
router.get('/models', getModels);
router.get('/models/:slug', getModelBySlug);

// User registered devices
router.post('/user-devices', authenticate, registerUserDevice);
router.get('/user-devices', authenticate, getUserDevices);

export default router;
