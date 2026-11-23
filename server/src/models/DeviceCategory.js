import mongoose from 'mongoose';

const deviceCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'Laptop'
    },
    imageUrl: {
      type: String,
      required: true
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    activeQuestionsCount: {
      type: Number,
      default: 0
    },
    verifiedSolutionsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const DeviceCategory = mongoose.model('DeviceCategory', deviceCategorySchema);
