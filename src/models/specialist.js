const mongoose = require("mongoose");
const Schema = mongoose.Schema
const validator = require("validator");

const specialistSchema = new Schema(
  {
    Name: {
      type: String,
      require: true,
      lowercase: true,
    },
    Email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Invalid");
        }
      },
    },
    Section: {
      type: String,
      require: true,
    },
    categoryOwner: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'category'
    },
    Active: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  { timestamps: true }
);

// plan collection
specialistSchema.virtual("plan", {
  ref: "plan",
  localField: "_id",
  foreignField: "specialistOwner",
});

// filter response ------------------------------
specialistSchema.methods.toJSON = function () {
  const Special = this;
  const SpecialObj = Special.toObject();

  delete SpecialObj.__v;
  delete SpecialObj.Active;
  delete SpecialObj.updatedAt;

  return SpecialObj;
};

const Specialist = mongoose.model("specialist", specialistSchema);
module.exports = Specialist;
