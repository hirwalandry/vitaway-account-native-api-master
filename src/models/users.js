const config = require('config')
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema(
  {
    Firstname: {
      type: String,
      require: true,
      lowercase: true,
      minLength: 5,
      maxLength: 20
    },
    Lastname: {
      type: String,
      require: true,
      lowercase: true,
      minLength: 5,
      maxLength: 20
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
    Password: {
      type: String,
      require: true,
      minLength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password should Not includes 'password'");
        }
      },
    },
    Verified: {
      type: Boolean,
      require: true,
      default: false
    },
    VerificationCode: {
      type: Number,
      require: true,
    },
    Avatar: {
      type: Buffer,
      require: true,
      default: "Avatar_image",
    },
    Birthday: {
      type: Date,
      require: true,
      default: ''
    },
    Country: {
      type: String,
      require: true,
      default: 'unLocated'
    },
    City: {
      type: String,
      require: true,
      default: "unLocated"
    },
    Contact: {
      type: String,
      require: true
    },
    HealthySection: {
      type: String, 
      require: true
    },
    Active: {
      type: Boolean,
      require: true,
      default: true
    },
    Tokens: [
      {
        token: {
          type: String,
          require: true,
          default: "unknown"
        },
      },
    ],
  },
  { timestamps: true },{collection: 'users'}
);

// filter response ------------------------------
userSchema.methods.toJSON = function(){
  const user = this;
  const userObj = user.toObject();

  delete userObj.__v;
  delete userObj.Tokens;
  delete userObj.Verified;
  delete userObj.VerificationCode;
  delete userObj.Password;
  delete userObj.updatedAt;

  return userObj;
}

// reference table ----------------------------
// goal collection
userSchema.virtual('goal', {
  ref: 'goal',
  localField: '_id',
  foreignField: 'Owner'
})
// group collection
userSchema.virtual('group_member', {
  ref: 'group_member',
  localField: '_id',
  foreignField: 'userOwner'
})
// medical record collection
userSchema.virtual('medical_rec', {
  ref: 'medical_rec',
  localField: '_id',
  foreignField: 'Owner'
})
// message collection
userSchema.virtual('message', {
  ref: 'message',
  localField: '_id',
  foreignField: 'userOwner'
})
// notifications collection
userSchema.virtual('notification', {
  ref: 'notification',
  localField: '_id',
  foreignField: 'Owner'
})
// plan collection
userSchema.virtual('plan', {
  ref: 'plan',
  localField: '_id',
  foreignField: 'userOwner'
})

// vital sign collection
userSchema.virtual('vital_sign', {
  ref: 'vital_sign',
  localField: '_id',
  foreignField: 'Owner'
})

// before it save password--------------------
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("Password")) {
    user.Password = await bcrypt.hash(user.Password, 8);
  }
  next();
});

// find the user on login request -----------------------------
userSchema.statics.findByCredentials = async function(Email, Password) {
    const user = await User.findOne({ Email })
    
    if(!user){
        throw new Error('unable to login')
       
    }
    const isMatch = await bcrypt.compare(Password, user.Password)
    if (!isMatch) {
        throw new Error('unable to login')
        
    }
    return user
};

// generate Auth tokens -----------------------------------------
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    config.get("JWT_SECRET_TOKEN")
  );

  user.Tokens = user.Tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
