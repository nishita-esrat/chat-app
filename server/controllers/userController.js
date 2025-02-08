const User = require("../modal/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinaryDeleteImage = require("../utility/deleteImage");
const cloudinaryUploadImage = require("../utility/uploadImage");

// registration
const registration = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({
      success: false,
      message:
        "All fields are required and password must be at least 6 characters long.",
    });
  }
  const isExist = await User.findOne({ email });
  if (isExist) {
    return res.status(409).json({
      success: false,
      message: "user already exists",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };
    const user = await User.create({ ...newUser });
    return res.status(201).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 6) {
    return res.status(400).json({
      success: false,
      message:
        "All fields are required and password must be at least 6 characters long.",
    });
  }
  const user = await User.findOne({ email }).select(
    "password name email avatar createdAt updatedAt"
  );
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "please sign up first",
    });
  }
  try {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "invalid credentials",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    return res
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        user: user,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// log out
const logout = (_req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "Logged out" });
};

// update password
const updatePassword = async (req, res) => {
  try {
    const id = req.id;
    const { oldPassword, newPassword } = req.body;
    if (
      !oldPassword ||
      oldPassword.length < 6 ||
      !newPassword ||
      newPassword.length < 6
    ) {
      return res.status(400).json({
        success: false,
        message: "(New / Old) password must be at least 6 characters long.",
      });
    }

    const user = await User.findById(id).select("password name");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: `${user.name}, your password is updated successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// update profile
const updateProfile = async (req, res) => {
  try {
    const id = req.id;
    const { image } = req.body;
    if (!image) {
      return res.status(401).json({
        success: false,
        message: "No image provided",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // If user has an existing avatar and public_id, delete the old image from Cloudinary
    if (user.avatar && user.avatar.public_id) {
      const deleteImage = await cloudinaryDeleteImage(user.avatar.public_id);
      if (deleteImage !== "ok") {
        return res.status(500).json({
          success: false,
          message: "Failed to delete old image from Cloudinary",
        });
      }
    }
    // Upload new image to Cloudinary
    const uploadedImage = await cloudinaryUploadImage(image, "avatar");
    if (!uploadedImage || !uploadedImage.url || !uploadedImage.public_id) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    } // Update user avatar with new image details
    user.avatar = {
      image: uploadedImage.url,
      public_id: uploadedImage.public_id,
    };

    // Save the updated user profile
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = { registration, login, logout, updatePassword, updateProfile };
