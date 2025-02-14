const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      image: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    reset_token: {
      type: String,
      default: "",
    },
    token_expiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// forgot password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.reset_token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.token_expiry = Date.now() + 1 * 60 * 1000;
  return resetToken;
};

// ✅ Ensure password is not returned by default
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
