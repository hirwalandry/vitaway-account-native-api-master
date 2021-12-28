const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const goalSchema = new Schema(
  {
    Name: {
      type: String,
      require: true,
      lowercase: true,
    },
    Start: {
      type: String,
      require: true,
    },
    End: {
      type: String,
      require: true,
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
goalSchema.methods.toJSON = function () {
  const Goal = this;
  const GoalObj = Goal.toObject();

  delete GoalObj.__v;
  delete GoalObj.Active;
  delete GoalObj.updatedAt;

  return GoalObj;
};

const Goal = mongoose.model("goal", goalSchema);
module.exports = Goal;
