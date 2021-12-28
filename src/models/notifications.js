const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const notificationSchema = new Schema(
  {
    Message: {
      type: String,
      require: true,
      lowercase: true,
    },
    Readed: {
      type: Boolean,
      require: true,
      default: true,
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
notificationSchema.methods.toJSON = function () {
  const notification = this;
  const notificationObj = notification.toObject();

  delete notificationObj.__v;
  delete notificationObj.Active;
  delete notificationObj.updatedAt;

  return notificationObj;
};

const Notification = mongoose.model("notification", notificationSchema);
module.exports = Notification;
