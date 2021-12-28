const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const planSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
      lowercase: true,
    },
    Description: {
      type: String,
      require: true,
    },
    Start: {
      type: String,
      require: true,
    },
    End: {
      type: String,
      require: true,
    },
    specialistOwner: {
      type: ObjectId,
      require: true,
      ref: 'specialist'
    },
    userOwner: {
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
  { timestamps: true },{collection: 'plans'}
);

// filter response ------------------------------
planSchema.methods.toJSON = function () {
  const Message = this;
  const MessageObj = Message.toObject();

  delete MessageObj.__v;
  delete MessageObj.Active;
  delete MessageObj.updatedAt;

  return MessageObj;
};

const Plan = mongoose.model("plan", planSchema);
module.exports = Plan;
