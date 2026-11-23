import mongoose from 'mongoose';

const outcomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device'
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    solutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Solution',
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: ['worked', 'partly_worked', 'nothing_worked', 'did_not_try'],
      required: true
    },
    notes: {
      type: String,
      default: ''
    },
    verificationPhotoUrl: {
      type: String,
      default: ''
    },
    attemptDurationMin: {
      type: Number,
      default: 0
    },
    confirmedAfter24h: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

outcomeSchema.index({ userId: 1, solutionId: 1 });

export const Outcome = mongoose.model('Outcome', outcomeSchema);
