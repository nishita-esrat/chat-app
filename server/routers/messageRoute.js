const express = require("express");
const isAuthenticate = require("../middleware");
const {
  sendMessage,
  markSeenMessage,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/sent-msg", isAuthenticate, sendMessage);
router.put("/mark-seen-msg", isAuthenticate, markSeenMessage);

module.exports = router;
