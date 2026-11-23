import express from 'express';
import { recordOutcome, getSolutionOutcomeStats } from '../controllers/outcomeController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, recordOutcome);
router.get('/stats/:solutionId', getSolutionOutcomeStats);

export default router;
