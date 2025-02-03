const mongoose = require("mongoose");
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
      select: false
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
// ✅ Ensure password is not returned by default
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
