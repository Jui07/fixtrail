import { Question } from '../models/Question.js';
import { Answer } from '../models/Answer.js';
import { User } from '../models/User.js';

export const getQuestions = async (req, res, next) => {
  try {
    const { categoryId, manufacturerId, modelId, status, search, sort = 'newest', page = 1, limit = 10 } = req.query;
    const filter = {};

    if (categoryId) filter.categoryId = categoryId;
    if (manufacturerId) filter.manufacturerId = manufacturerId;
    if (modelId) filter.modelId = modelId;
    if (status) filter.status = status;
    if (search) {
      filter.$text = { $search: search };
    }

    const sortOptions = {};
    if (sort === 'score') sortOptions.score = -1;
    else if (sort === 'views') sortOptions.views = -1;
    else if (sort === 'unanswered') {
      filter.answersCount = 0;
      sortOptions.createdAt = -1;
    } else {
      sortOptions.createdAt = -1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Question.countDocuments(filter);

    const questions = await Question.find(filter)
      .populate('authorId', 'fullName username avatarUrl reputationPoints role')
      .populate('categoryId', 'name slug icon')
      .populate('manufacturerId', 'name slug logoUrl')
      .populate('modelId', 'name slug')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: questions.length,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: questions
    });
  } catch (err) {
    next(err);
  }
};

export const getQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('authorId', 'fullName username avatarUrl reputationPoints role expertBadges')
      .populate('categoryId', 'name slug icon')
      .populate('manufacturerId', 'name slug logoUrl')
      .populate('modelId', 'name slug biosKeys blinkCodes specs');

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found.'
      });
    }

    // Fetch answers sorted by isAccepted first, then score descending
    const answers = await Answer.find({ questionId: question._id })
      .populate('authorId', 'fullName username avatarUrl reputationPoints role expertBadges')
      .populate('expertReviewedBy', 'fullName username role')
      .sort({ isAccepted: -1, score: -1, createdAt: 1 });

    res.status(200).json({
      success: true,
      data: {
        question,
        answers
      }
    });
  } catch (err) {
    next(err);
  }
};

export const createQuestion = async (req, res, next) => {
  try {
    const {
      title,
      description,
      categoryId,
      manufacturerId,
      modelId,
      osVersion,
      biosVersion,
      symptoms = [],
      errorCodes = [],
      troubleshootingAttempted,
      images = [],
      tags = []
    } = req.body;

    if (!title || !description || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields: title, description, and device category.'
      });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const question = await Question.create({
      title,
      slug,
      description,
      authorId: req.user._id,
      categoryId,
      manufacturerId,
      modelId,
      osVersion,
      biosVersion,
      symptoms: Array.isArray(symptoms) ? symptoms : [symptoms],
      errorCodes: Array.isArray(errorCodes) ? errorCodes : [errorCodes],
      troubleshootingAttempted,
      images,
      tags: Array.isArray(tags) ? tags : [tags]
    });

    // Reward reputation for creating a technical question
    await User.findByIdAndUpdate(req.user._id, { $inc: { reputationPoints: 5 } });

    res.status(201).json({
      success: true,
      message: 'Question posted to community.',
      data: question
    });
  } catch (err) {
    next(err);
  }
};

export const voteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value } = req.body; // 1 (upvote), -1 (downvote), or 0 (cancel)
    const userId = req.user._id;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found.' });
    }

    // Remove existing votes
    question.upvotes = question.upvotes.filter((u) => u.toString() !== userId.toString());
    question.downvotes = question.downvotes.filter((u) => u.toString() !== userId.toString());

    if (value === 1) {
      question.upvotes.push(userId);
    } else if (value === -1) {
      question.downvotes.push(userId);
    }

    question.score = question.upvotes.length - question.downvotes.length;
    await question.save();

    res.status(200).json({
      success: true,
      score: question.score,
      upvotesCount: question.upvotes.length,
      downvotesCount: question.downvotes.length
    });
  } catch (err) {
    next(err);
  }
};

export const createAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, steps = [], requiredTools = [], difficulty, safetyLevel, safetyPrecautions, images = [] } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Answer content is required.'
      });
    }

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found.' });
    }

    const answer = await Answer.create({
      questionId: question._id,
      authorId: req.user._id,
      content,
      steps,
      requiredTools,
      difficulty: difficulty || 'beginner',
      safetyLevel: safetyLevel || 'safe',
      safetyPrecautions,
      images
    });

    // Increment answer count on question
    await Question.findByIdAndUpdate(id, { $inc: { answersCount: 1 } });

    // Reward reputation to answerer
    await User.findByIdAndUpdate(req.user._id, { $inc: { reputationPoints: 10 } });

    const populated = await Answer.findById(answer._id).populate('authorId', 'fullName username avatarUrl reputationPoints role');

    res.status(201).json({
      success: true,
      message: 'Answer submitted.',
      data: populated
    });
  } catch (err) {
    next(err);
  }
};

export const voteAnswer = async (req, res, next) => {
  try {
    const { answerId } = req.params;
    const { value } = req.body;
    const userId = req.user._id;

    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ success: false, message: 'Answer not found.' });
    }

    answer.upvotes = answer.upvotes.filter((u) => u.toString() !== userId.toString());
    answer.downvotes = answer.downvotes.filter((u) => u.toString() !== userId.toString());

    if (value === 1) {
      answer.upvotes.push(userId);
    } else if (value === -1) {
      answer.downvotes.push(userId);
    }

    answer.score = answer.upvotes.length - answer.downvotes.length;
    await answer.save();

    res.status(200).json({
      success: true,
      score: answer.score,
      upvotesCount: answer.upvotes.length,
      downvotesCount: answer.downvotes.length
    });
  } catch (err) {
    next(err);
  }
};

export const acceptAnswer = async (req, res, next) => {
  try {
    const { questionId, answerId } = req.params;
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found.' });
    }

    if (question.authorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only the question author can accept an answer as the solution.'
      });
    }

    // Unset any previous accepted answer
    await Answer.updateMany({ questionId }, { isAccepted: false });

    // Set new accepted answer
    const answer = await Answer.findByIdAndUpdate(answerId, { isAccepted: true }, { new: true });
    question.acceptedAnswerId = answer._id;
    question.status = 'resolved';
    await question.save();

    // Reward points to answer author (+15 points for accepted answer)
    await User.findByIdAndUpdate(answer.authorId, { $inc: { reputationPoints: 15 } });

    res.status(200).json({
      success: true,
      message: 'Answer marked as accepted solution.',
      data: answer
    });
  } catch (err) {
    next(err);
  }
};
