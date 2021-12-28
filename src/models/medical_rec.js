const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const medicalRecSchema = new Schema(
  {
    Name: {
      type: String,
      require: true,
      lowercase: true,
      default: "Untitled",
    },
    Media: {
      type: Buffer,
      require: true,
      default: "MedicalRecMedia",
    },
    MediaType: {
      type: String,
      require: true,
      default: ".unKnown",
    },
    Owner: {
      type: ObjectId,
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
medicalRecSchema.methods.toJSON = function () {
  const medicalRec = this;
  const medicalRecObj = medicalRec.toObject();

  delete medicalRecObj.__v;
  delete medicalRecObj.Active;
  delete medicalRecObj.updatedAt;

  return medicalRecObj;
};

const MedicalRec = mongoose.model("medical_rec", medicalRecSchema);
module.exports = MedicalRec;
