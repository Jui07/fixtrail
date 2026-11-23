import express from 'express';
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  voteQuestion,
  createAnswer,
  voteAnswer,
  acceptAnswer
} from '../controllers/questionController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getQuestions);
router.post('/', authenticate, createQuestion);
router.get('/:id', optionalAuth, getQuestionById);
router.post('/:id/vote', authenticate, voteQuestion);

// Answers
router.post('/:id/answers', authenticate, createAnswer);
router.post('/answers/:answerId/vote', authenticate, voteAnswer);
router.post('/:questionId/answers/:answerId/accept', authenticate, acceptAnswer);

export default router;
