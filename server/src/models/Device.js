import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeviceModel',
      required: true,
      index: true
    },
    nickname: {
      type: String,
      trim: true
    },
    serialNumber: {
      type: String,
      trim: true
    },
    purchaseYear: {
      type: Number
    },
    osVersion: {
      type: String,
      default: ''
    },
    biosVersion: {
      type: String,
      default: ''
    },
    healthStatus: {
      type: String,
      enum: ['healthy', 'needs_attention', 'under_repair', 'retired'],
      default: 'healthy'
    },
    repairHistory: [
      {
        date: { type: Date, default: Date.now },
        title: String,
        symptom: String,
        outcome: String,
        solutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }
      }
    ]
  },
  {
    timestamps: true
  }
);

export const Device = mongoose.model('Device', deviceSchema);
