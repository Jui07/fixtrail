import { Solution } from '../models/Solution.js';
import { Outcome } from '../models/Outcome.js';

export const getSolutions = async (req, res, next) => {
  try {
    const { categoryId, modelId, symptom, search, difficulty, safetyLevel, page = 1, limit = 12 } = req.query;
    const filter = {};

    if (categoryId) filter.categoryId = categoryId;
    if (modelId) filter.targetModels = modelId;
    if (difficulty) filter.difficulty = difficulty;
    if (safetyLevel) filter.safetyLevel = safetyLevel;

    if (symptom) {
      filter.symptomKeywords = { $in: [new RegExp(symptom.trim(), 'i')] };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { rootCause: { $regex: search, $options: 'i' } },
        { symptomKeywords: { $in: [new RegExp(search.trim(), 'i')] } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Solution.countDocuments(filter);

    // Statistically ranked by Wilson Lower Confidence Bound
    const solutions = await Solution.find(filter)
      .populate('categoryId', 'name slug icon')
      .populate('targetModels', 'name slug manufacturerId')
      .sort({ 'stats.wilsonScore': -1, 'stats.workedCount': -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: solutions.length,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: solutions
    });
  } catch (err) {
    next(err);
  }
};

export const getSolutionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const solution = await Solution.findById(id)
      .populate('categoryId', 'name slug icon imageUrl')
      .populate({
        path: 'targetModels',
        populate: { path: 'manufacturerId', select: 'name logoUrl' }
      })
      .populate('authorId', 'fullName username avatarUrl role');

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution guide not found.'
      });
    }

    // Recent outcome reports with feedback notes
    const recentOutcomes = await Outcome.find({ solutionId: solution._id })
      .populate('userId', 'fullName username role avatarUrl')
      .sort({ createdAt: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      data: {
        solution,
        recentOutcomes
      }
    });
  } catch (err) {
    next(err);
  }
};

export const createSolution = async (req, res, next) => {
  try {
    const {
      title,
      description,
      categoryId,
      targetModels = [],
      symptomKeywords = [],
      errorCodes = [],
      rootCause,
      steps = [],
      requiredTools = [],
      difficulty,
      safetyLevel,
      sourceCaseStudy
    } = req.body;

    if (!title || !description || !categoryId || !rootCause) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, description, category, and rootCause.'
      });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const solution = new Solution({
      title,
      slug,
      description,
      categoryId,
      targetModels,
      symptomKeywords,
      errorCodes,
      rootCause,
      steps,
      requiredTools,
      difficulty: difficulty || 'beginner',
      safetyLevel: safetyLevel || 'safe',
      sourceCaseStudy,
      authorId: req.user._id,
      stats: {
        totalAttempts: 0,
        workedCount: 0,
        partlyWorkedCount: 0,
        failedCount: 0,
        wilsonScore: 0,
        evidenceLevel: 'Initial'
      }
    });

    await solution.save();

    res.status(201).json({
      success: true,
      message: 'Solution published to intelligence base.',
      data: solution
    });
  } catch (err) {
    next(err);
  }
};
