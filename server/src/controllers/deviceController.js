import { DeviceCategory } from '../models/DeviceCategory.js';
import { Manufacturer } from '../models/Manufacturer.js';
import { DeviceModel } from '../models/DeviceModel.js';
import { Device } from '../models/Device.js';
import { Question } from '../models/Question.js';
import { Solution } from '../models/Solution.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await DeviceCategory.find({ isActive: true }).sort({ displayOrder: 1, name: 1 });
    
    // Update live question/solution counts
    const enriched = await Promise.all(
      categories.map(async (cat) => {
        const qCount = await Question.countDocuments({ categoryId: cat._id });
        const sCount = await Solution.countDocuments({ categoryId: cat._id });
        const obj = cat.toObject();
        obj.activeQuestionsCount = qCount;
        obj.verifiedSolutionsCount = sCount;
        return obj;
      })
    );

    res.status(200).json({
      success: true,
      count: enriched.length,
      data: enriched
    });
  } catch (err) {
    next(err);
  }
};

export const getManufacturers = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    const filter = { isVerified: true };

    if (categoryId) {
      filter.categories = categoryId;
    }

    const manufacturers = await Manufacturer.find(filter).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: manufacturers.length,
      data: manufacturers
    });
  } catch (err) {
    next(err);
  }
};

export const getModels = async (req, res, next) => {
  try {
    const { categoryId, manufacturerId, search } = req.query;
    const filter = {};

    if (categoryId) filter.categoryId = categoryId;
    if (manufacturerId) filter.manufacturerId = manufacturerId;
    if (search) {
      filter.$text = { $search: search };
    }

    const models = await DeviceModel.find(filter)
      .populate('manufacturerId', 'name slug logoUrl')
      .populate('categoryId', 'name slug icon')
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: models.length,
      data: models
    });
  } catch (err) {
    next(err);
  }
};

export const getModelBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const model = await DeviceModel.findOne({ slug })
      .populate('manufacturerId', 'name slug logoUrl websiteUrl')
      .populate('categoryId', 'name slug icon imageUrl');

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Device model not found.'
      });
    }

    // Also fetch common questions & solutions for this model
    const relatedQuestions = await Question.find({ modelId: model._id })
      .select('title score views answersCount status createdAt')
      .limit(5);

    const relatedSolutions = await Solution.find({ targetModels: model._id })
      .select('title stats difficulty safetyLevel rootCause')
      .sort({ 'stats.wilsonScore': -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        model,
        relatedQuestions,
        relatedSolutions
      }
    });
  } catch (err) {
    next(err);
  }
};

export const registerUserDevice = async (req, res, next) => {
  try {
    const { modelId, nickname, serialNumber, purchaseYear, osVersion, biosVersion } = req.body;

    if (!modelId) {
      return res.status(400).json({
        success: false,
        message: 'Device model is required.'
      });
    }

    const device = await Device.create({
      userId: req.user._id,
      modelId,
      nickname: nickname || 'My Device',
      serialNumber,
      purchaseYear,
      osVersion,
      biosVersion,
      healthStatus: 'healthy',
      repairHistory: []
    });

    const populated = await Device.findById(device._id)
      .populate({
        path: 'modelId',
        populate: [
          { path: 'manufacturerId', select: 'name logoUrl' },
          { path: 'categoryId', select: 'name icon' }
        ]
      });

    res.status(201).json({
      success: true,
      message: 'Device registered to your passport.',
      data: populated
    });
  } catch (err) {
    next(err);
  }
};

export const getUserDevices = async (req, res, next) => {
  try {
    const devices = await Device.find({ userId: req.user._id })
      .populate({
        path: 'modelId',
        populate: [
          { path: 'manufacturerId', select: 'name logoUrl' },
          { path: 'categoryId', select: 'name icon' }
        ]
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices
    });
  } catch (err) {
    next(err);
  }
};
