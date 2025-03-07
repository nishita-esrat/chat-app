
const express = require("express");
const isAuthenticate = require("../middleware");
const { sendMessage } = require("../controllers/messageController");
const router = express.Router();

router.post("/sent-msg",isAuthenticate,sendMessage)
module.exports = router
