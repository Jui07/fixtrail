import mongoose from 'mongoose';

const deviceModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Model name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Manufacturer',
      required: true,
      index: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeviceCategory',
      required: true,
      index: true
    },
    releaseYear: {
      type: Number
    },
    imageUrl: {
      type: String,
      default: ''
    },
    specs: {
      cpu: String,
      ramType: String,
      storageType: String,
      batteryModel: String,
      displayResolution: String
    },
    biosKeys: {
      setupKey: { type: String, default: 'F2' },
      bootMenuKey: { type: String, default: 'F12' }
    },
    blinkCodes: [
      {
        pattern: String,
        component: String,
        meaning: String,
        ledColor: String,
        severity: String
      }
    ],
    screwSpecs: [
      {
        location: String,
        size: String,
        colorHex: String,
        warning: String
      }
    ],
    commonSymptoms: [
      { type: String }
    ]
  },
  {
    timestamps: true
  }
);

deviceModelSchema.index({ manufacturerId: 1, categoryId: 1 });
deviceModelSchema.index({ name: 'text', commonSymptoms: 'text' });

export const DeviceModel = mongoose.model('DeviceModel', deviceModelSchema);
