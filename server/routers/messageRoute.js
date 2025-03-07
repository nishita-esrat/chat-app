const express = require("express");
const isAuthenticate = require("../middleware");
const {
  sendMessage,
  markSeenMessage,
  deleteMessage,
  updateMessage,
  reactionsMessage,
  reactionUser,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/sent-msg", isAuthenticate, sendMessage);
router.put("/mark-seen-msg", isAuthenticate, markSeenMessage);
router.delete("/delete-msg/:message_id", isAuthenticate, deleteMessage);
router.put("/update-msg/:message_id", isAuthenticate, updateMessage);
router.put("/reactions-msg/:message_id", isAuthenticate, reactionsMessage);
router.get("/reactions-user-msg/:message_id", isAuthenticate, reactionUser);

module.exports = router;
