const express = require("express");
const isAuthenticate = require("../middleware");
const {
  sendMessage,
  markSeenMessage,
  messageDelete,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/sent-msg", isAuthenticate, sendMessage);
router.put("/mark-seen-msg", isAuthenticate, markSeenMessage);
router.delete("/delete-msg/:message_id", isAuthenticate, messageDelete);

module.exports = router;
