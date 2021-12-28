const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
      lowercase: true,
    },
    Active: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  { timestamps: true }
);

// reference
categorySchema.virtual("group", {
  ref: "group",
  localField: "_id",
  foreignField: "Owner",
});

// reference
categorySchema.virtual("specialist", {
  ref: "specialist",
  localField: "_id",
  foreignField: "categoryOwner",
});

// filter response ------------------------------
categorySchema.methods.toJSON = function () {
  const Category = this;
  const CategoryObj = Category.toObject();

  delete CategoryObj.__v;
  delete CategoryObj.Active;
  delete CategoryObj.updatedAt;

  return CategoryObj;
};

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
