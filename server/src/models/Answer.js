import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
      index: true
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    content: {
      type: String,
      required: [true, 'Answer content is required']
    },
    steps: [
      {
        stepNumber: Number,
        title: String,
        instruction: String,
        toolRequired: String,
        caution: String
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
    safetyPrecautions: {
      type: String,
      default: ''
    },
    images: [
      { type: String }
    ],
    upvotes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    downvotes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    score: {
      type: Number,
      default: 0,
      index: true
    },
    isAccepted: {
      type: Boolean,
      default: false,
      index: true
    },
    expertReviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    expertReviewNotes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export const Answer = mongoose.model('Answer', answerSchema);
