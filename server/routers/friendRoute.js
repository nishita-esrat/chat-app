
const express = require("express")
const isAuthenticate = require("../middleware")
const { sendFriendReq } = require("../controllers/friendController")
const router = express.Router()

router.post("/sent-req",isAuthenticate,sendFriendReq)

module.exports = router