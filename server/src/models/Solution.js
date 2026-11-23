import mongoose from 'mongoose';

const solutionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Solution title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeviceCategory',
      required: true,
      index: true
    },
    targetModels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeviceModel',
        index: true
      }
    ],
    symptomKeywords: [
      { type: String, lowercase: true, trim: true, index: true }
    ],
    errorCodes: [
      { type: String, uppercase: true, trim: true }
    ],
    rootCause: {
      type: String,
      required: true
    },
    steps: [
      {
        stepNumber: Number,
        title: String,
        instruction: String,
        toolRequired: String,
        safetyWarning: String,
        estimatedMinutes: Number
      }
    ],
    requiredTools: [
      { type: String }
    ],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    safetyLevel: {
      type: String,
      enum: ['safe', 'caution', 'hazardous'],
      default: 'safe'
    },
    stats: {
      totalAttempts: { type: Number, default: 0 },
      workedCount: { type: Number, default: 0 },
      partlyWorkedCount: { type: Number, default: 0 },
      failedCount: { type: Number, default: 0 },
      wilsonScore: { type: Number, default: 0, index: true },
      evidenceLevel: {
        type: String,
        enum: ['Initial', 'Moderate', 'High', 'Bench-Verified'],
        default: 'Initial'
      }
    },
    verifiedEvidenceCount: {
      type: Number,
      default: 0
    },
    sourceCaseStudy: {
      type: String,
      default: ''
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Method to calculate Wilson Lower Confidence Bound (95% confidence, z = 1.96)
solutionSchema.methods.recalculateWilsonScore = function () {
  const W = this.stats.workedCount + (0.5 * this.stats.partlyWorkedCount);
  const N = this.stats.workedCount + this.stats.failedCount + this.stats.partlyWorkedCount;

  if (N === 0) {
    this.stats.wilsonScore = 0;
    this.stats.evidenceLevel = 'Initial';
    return 0;
  }

  const z = 1.96;
  const p = W / N;
  const numerator = p + (z * z) / (2 * N) - z * Math.sqrt((p * (1 - p) + (z * z) / (4 * N)) / N);
  const denominator = 1 + (z * z) / N;
  const score = Math.max(0, numerator / denominator);

  this.stats.totalAttempts = N;
  this.stats.wilsonScore = parseFloat(score.toFixed(4));

  if (N >= 15 && score >= 0.5) {
    this.stats.evidenceLevel = 'Bench-Verified';
  } else if (N >= 8 && score >= 0.4) {
    this.stats.evidenceLevel = 'High';
  } else if (N >= 3) {
    this.stats.evidenceLevel = 'Moderate';
  } else {
    this.stats.evidenceLevel = 'Initial';
  }

  return this.stats.wilsonScore;
};

export const Solution = mongoose.model('Solution', solutionSchema);
