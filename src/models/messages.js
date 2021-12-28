const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema(
  {
    Message: {
      type: String,
      require: true,
      
    },
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
messageSchema.methods.toJSON = function () {
  const Message = this;
  const MessageObj = Message.toObject();

  delete MessageObj.__v;
  delete MessageObj.Active;
  delete MessageObj.updatedAt;

  return MessageObj;
};

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
