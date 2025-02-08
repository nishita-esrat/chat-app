const express = require("express");
const {
  registration,
  login,
  logout,
  updatePassword,
  updateProfile,
} = require("../controllers/userController");
const isAuthenticate = require("../middleware");
const router = express.Router();

router.post("/sign-up", registration);
router.get("/sign-in", login);
router.get("/log-out", logout);
router.get("/update-password", isAuthenticate, updatePassword);
router.get("/update-profile", isAuthenticate, updateProfile);

module.exports = router;
