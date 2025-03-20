const express = require("express");
const isAuthenticate = require("../middleware");
const {
  allNotifications,
  deleteNotification,
} = require("../controllers/notificationController");

const router = express.Router();

router.get("/all", isAuthenticate, allNotifications);
router.delete("/delete/:id", deleteNotification);

module.exports = router;
