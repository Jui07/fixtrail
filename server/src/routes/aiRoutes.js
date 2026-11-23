import express from 'express';
import { triageProblem, getDecisionTreeNode, visionInspect } from '../controllers/aiController.js';

const router = express.Router();

router.post('/triage', triageProblem);
router.post('/decision-tree', getDecisionTreeNode);
router.post('/vision-inspect', visionInspect);

export default router;
