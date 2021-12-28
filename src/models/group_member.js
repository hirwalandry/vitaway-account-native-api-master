const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const groupMemberSchema = new Schema(
  {
    groupOwner: {
        type: ObjectId,
        require: true,
        ref: 'group'
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
  { timestamps: true }
);

// filter response ------------------------------
groupMemberSchema.methods.toJSON = function () {
  const member = this;
  const memberObj = member.toObject();

  delete memberObj.__v;
  delete memberObj.Active;
  delete memberObj.updatedAt;

  return memberObj;
};

const Member = mongoose.model("group_member", groupMemberSchema);
module.exports = Member;
