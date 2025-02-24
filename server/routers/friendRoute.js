
const express = require("express")
const isAuthenticate = require("../middleware")
const { sendFriendReq, acceptedFriendReq, rejectedFriendReq, allFriendReq } = require("../controllers/friendController")
const router = express.Router()

router.post("/sent-req",isAuthenticate,sendFriendReq)
router.patch("/accepted-req",isAuthenticate,acceptedFriendReq)
router.delete("/rejected-req",isAuthenticate,rejectedFriendReq)
router.get("/all-friends-req/:id",isAuthenticate,allFriendReq)

module.exports = router