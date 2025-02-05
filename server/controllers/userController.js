const User = require("../modal/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// registration
const registration = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
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
    return res.status(500).json({ message: "Server error" });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
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
    return res.status(500).json({ message: "Server error" });
  }
};

// log out
const logout = (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "Logged out" });
};

module.exports = { registration, login ,logout};
