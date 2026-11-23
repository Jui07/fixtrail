import { Outcome } from '../models/Outcome.js';
import { Solution } from '../models/Solution.js';
import { User } from '../models/User.js';

export const recordOutcome = async (req, res, next) => {
  try {
    const { solutionId, questionId, deviceId, status, notes, verificationPhotoUrl, attemptDurationMin } = req.body;
    const userId = req.user._id;

    if (!solutionId || !status) {
      return res.status(400).json({
        success: false,
        message: 'Solution ID and outcome status are required.'
      });
    }

    const validStatuses = ['worked', 'partly_worked', 'nothing_worked', 'did_not_try'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const solution = await Solution.findById(solutionId);
    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Target solution not found.'
      });
    }

    // Check for previous attempt by this user on this solution
    const existing = await Outcome.findOne({ userId, solutionId });
    if (existing) {
      // Revert previous tally from stats
      if (existing.status === 'worked') solution.stats.workedCount = Math.max(0, solution.stats.workedCount - 1);
      else if (existing.status === 'partly_worked') solution.stats.partlyWorkedCount = Math.max(0, solution.stats.partlyWorkedCount - 1);
      else if (existing.status === 'nothing_worked') solution.stats.failedCount = Math.max(0, solution.stats.failedCount - 1);

      // Update existing record
      existing.status = status;
      existing.notes = notes || existing.notes;
      existing.verificationPhotoUrl = verificationPhotoUrl || existing.verificationPhotoUrl;
      existing.attemptDurationMin = attemptDurationMin || existing.attemptDurationMin;
      await existing.save();
    } else {
      // Create new record
      await Outcome.create({
        userId,
        deviceId,
        questionId,
        solutionId,
        status,
        notes: notes || '',
        verificationPhotoUrl: verificationPhotoUrl || '',
        attemptDurationMin: attemptDurationMin || 0
      });

      // Reward reputation points for submitting a repair outcome
      await User.findByIdAndUpdate(userId, { $inc: { reputationPoints: 5 } });
    }

    // Apply new outcome to Solution stats (ignoring "did_not_try" as a failure per specification)
    if (status === 'worked') {
      solution.stats.workedCount += 1;
    } else if (status === 'partly_worked') {
      solution.stats.partlyWorkedCount += 1;
    } else if (status === 'nothing_worked') {
      solution.stats.failedCount += 1;
    }

    if (verificationPhotoUrl) {
      solution.verifiedEvidenceCount += 1;
    }

    // Recalculate Wilson score
    solution.recalculateWilsonScore();
    await solution.save();

    res.status(200).json({
      success: true,
      message: 'Repair outcome recorded. Intelligence ranking updated.',
      stats: solution.stats
    });
  } catch (err) {
    next(err);
  }
};

export const getSolutionOutcomeStats = async (req, res, next) => {
  try {
    const { solutionId } = req.params;
    const solution = await Solution.findById(solutionId).select('stats verifiedEvidenceCount title');

    if (!solution) {
      return res.status(404).json({ success: false, message: 'Solution not found.' });
    }

    const recentReports = await Outcome.find({ solutionId })
      .populate('userId', 'fullName username role')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        stats: solution.stats,
        verifiedEvidenceCount: solution.verifiedEvidenceCount,
        recentReports
      }
    });
  } catch (err) {
    next(err);
  }
};
