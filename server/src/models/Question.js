import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Question title is required'],
      trim: true,
      minlength: [10, 'Title must be at least 10 characters long'],
      maxlength: [200, 'Title cannot exceed 200 characters']
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
      required: [true, 'Problem description is required'],
      minlength: [20, 'Description must be at least 20 characters long']
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeviceCategory',
      required: true,
      index: true
    },
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Manufacturer',
      index: true
    },
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeviceModel',
      index: true
    },
    osVersion: {
      type: String,
      default: ''
    },
    biosVersion: {
      type: String,
      default: ''
    },
    symptoms: [
      { type: String, trim: true }
    ],
    errorCodes: [
      { type: String, trim: true }
    ],
    troubleshootingAttempted: {
      type: String,
      default: ''
    },
    images: [
      { type: String }
    ],
    tags: [
      { type: String, lowercase: true, trim: true }
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
    views: {
      type: Number,
      default: 0
    },
    acceptedAnswerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer'
    },
    status: {
      type: String,
      enum: ['open', 'resolved', 'closed'],
      default: 'open',
      index: true
    },
    answersCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

questionSchema.index({ title: 'text', description: 'text', symptoms: 'text', errorCodes: 'text' });

export const Question = mongoose.model('Question', questionSchema);
