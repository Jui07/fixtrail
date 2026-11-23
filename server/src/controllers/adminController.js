import { User } from '../models/User.js';
import { Question } from '../models/Question.js';
import { Answer } from '../models/Answer.js';
import { Solution } from '../models/Solution.js';
import { Outcome } from '../models/Outcome.js';
import { DeviceCategory } from '../models/DeviceCategory.js';
import { Manufacturer } from '../models/Manufacturer.js';
import { DeviceModel } from '../models/DeviceModel.js';
import { AuditLog } from '../models/AuditLog.js';

export const getAdminOverview = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalQuestions,
      totalAnswers,
      totalSolutions,
      totalOutcomes,
      workedCount,
      recentAuditLogs
    ] = await Promise.all([
      User.countDocuments(),
      Question.countDocuments(),
      Answer.countDocuments(),
      Solution.countDocuments(),
      Outcome.countDocuments(),
      Outcome.countDocuments({ status: 'worked' }),
      AuditLog.find().sort({ createdAt: -1 }).limit(10)
    ]);

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const solutionsEvidence = await Solution.aggregate([
      { $group: { _id: '$stats.evidenceLevel', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        kpis: {
          totalUsers,
          totalQuestions,
          totalAnswers,
          totalSolutions,
          totalOutcomes,
          workedCount,
          successRate: totalOutcomes > 0 ? Math.round((workedCount / totalOutcomes) * 100) : 0
        },
        usersByRole,
        solutionsEvidence,
        recentAuditLogs
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await User.countDocuments(filter);

    const users = await User.find(filter)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const allowed = ['user', 'expert', 'moderator', 'admin'];
    if (!allowed.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role.' });
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-passwordHash');

    await AuditLog.create({
      actorId: req.user._id,
      action: 'ADMIN_ROLE_CHANGE',
      resourceType: 'User',
      resourceId: userId,
      details: { newRole: role }
    });

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}.`,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

export const addDeviceCategory = async (req, res, next) => {
  try {
    const { name, description, icon, imageUrl } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const cat = await DeviceCategory.create({
      name,
      slug,
      description,
      icon: icon || 'Laptop',
      imageUrl
    });

    res.status(201).json({ success: true, data: cat });
  } catch (err) {
    next(err);
  }
};

export const addDeviceModel = async (req, res, next) => {
  try {
    const { name, manufacturerId, categoryId, releaseYear, specs, biosKeys, blinkCodes } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const model = await DeviceModel.create({
      name,
      slug,
      manufacturerId,
      categoryId,
      releaseYear,
      specs,
      biosKeys,
      blinkCodes
    });

    res.status(201).json({ success: true, data: model });
  } catch (err) {
    next(err);
  }
};
