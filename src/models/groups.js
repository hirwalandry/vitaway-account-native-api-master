const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const groupSchema = new Schema(
  {
    Name: {
      type: String,
      require: true
    },
    Owner: {
      type: ObjectId,
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

// references collection
groupSchema.virtual("group_member", {
  ref: "group_member",
  localField: "_id",
  foreignField: "groupOwner",
});
groupSchema.virtual("message", {
  ref: "message",
  localField: "_id",
  foreignField: "groupOwner",
});

// filter response ------------------------------
groupSchema.methods.toJSON = function () {
  const Group = this;
  const GroupObj = Group.toObject();

  delete GroupObj.__v;
  delete GroupObj.Active;
  delete GroupObj.updatedAt;

  return GroupObj;
};

const Group = mongoose.model("group", groupSchema);
module.exports = Group;
