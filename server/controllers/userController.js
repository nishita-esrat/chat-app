const User = require("../modal/userModal");
const bcrypt = require("bcryptjs");


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
module.exports = { registration };
