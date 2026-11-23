import express from 'express';
import { getSolutions, getSolutionById, createSolution } from '../controllers/solutionController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', optionalAuth, getSolutions);
router.get('/:id', optionalAuth, getSolutionById);
router.post('/', authenticate, requireRole('expert', 'admin'), createSolution);

export default router;
