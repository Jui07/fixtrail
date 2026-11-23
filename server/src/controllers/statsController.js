import { User } from '../models/User.js';
import { Question } from '../models/Question.js';
import { Answer } from '../models/Answer.js';
import { Solution } from '../models/Solution.js';
import { Outcome } from '../models/Outcome.js';
import { DeviceModel } from '../models/DeviceModel.js';

export const getPlatformStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalQuestions,
      totalAnswers,
      totalSolutions,
      totalOutcomes,
      workedOutcomes,
      totalModels
    ] = await Promise.all([
      User.countDocuments(),
      Question.countDocuments(),
      Answer.countDocuments(),
      Solution.countDocuments(),
      Outcome.countDocuments(),
      Outcome.countDocuments({ status: 'worked' }),
      DeviceModel.countDocuments()
    ]);

    const evaluatedAttempts = await Outcome.countDocuments({
      status: { $in: ['worked', 'partly_worked', 'nothing_worked'] }
    });

    const realSuccessRate = evaluatedAttempts > 0
      ? Math.round((workedOutcomes / evaluatedAttempts) * 100)
      : 0;

    // Top verified solutions based on Wilson Score
    const topSolutions = await Solution.find()
      .populate('categoryId', 'name icon')
      .sort({ 'stats.wilsonScore': -1, 'stats.workedCount': -1 })
      .limit(4)
      .select('title stats rootCause difficulty');

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalQuestions,
        totalAnswers,
        totalSolutions,
        totalModels,
        totalOutcomes,
        evaluatedAttempts,
        verifiedRepairsCount: workedOutcomes,
        realSuccessRate,
        topSolutions
      }
    });
  } catch (err) {
    next(err);
  }
};
