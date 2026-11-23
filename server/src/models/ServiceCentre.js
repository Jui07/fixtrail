import mongoose from 'mongoose';

const serviceCentreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      default: ''
    },
    supportedBrands: [
      { type: String, trim: true, index: true }
    ],
    rating: {
      type: Number,
      default: 4.5
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    isAuthorizedOEM: {
      type: Boolean,
      default: false
    },
    timings: {
      type: String,
      default: 'Mon - Sat: 10:00 AM - 7:30 PM'
    },
    verifiedByFixTrail: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const ServiceCentre = mongoose.model('ServiceCentre', serviceCentreSchema);
