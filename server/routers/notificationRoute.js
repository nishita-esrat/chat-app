const express = require("express");
const isAuthenticate = require("../middleware");
const {
  allNotifications,
  deleteNotification,
  readNotification,
} = require("../controllers/notificationController");

const router = express.Router();

router.get("/all", isAuthenticate, allNotifications);
router.delete("/delete/:id", deleteNotification);
router.put("/read/:id", isAuthenticate, readNotification);

module.exports = router;
