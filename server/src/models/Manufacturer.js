import mongoose from 'mongoose';

const manufacturerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Manufacturer name is required'],
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
    logoUrl: {
      type: String,
      default: ''
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeviceCategory'
      }
    ],
    websiteUrl: {
      type: String,
      default: ''
    },
    isVerified: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);
