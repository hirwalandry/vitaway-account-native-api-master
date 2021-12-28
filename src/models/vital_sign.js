const mongoose = require("mongoose");
const Schema = mongoose.Schema

const vitalSignSchema = new Schema(
  {
    BMI: {
      type: String,
      require: true,
      lowercase: true,
    },
    Systolic: {
      type: String,
      require: true,
    },
    Diastolic: {
      type: String,
      require: true,
    },
    BloodGlucose: {
      type: String,
      require: true,
    },
    Owner: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'User'
    },
    Active: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  { timestamps: true }
);

// filter response ------------------------------
vitalSignSchema.methods.toJSON = function () {
  const vitalSign = this;
  const vitalSignObj = vitalSign.toObject();

  delete vitalSignObj.__v;
  delete vitalSignObj.Active;
  delete vitalSignObj.updatedAt;

  return vitalSignObj;
};

const VitalSign = mongoose.model("vital_sign", vitalSignSchema);
module.exports = VitalSign;
