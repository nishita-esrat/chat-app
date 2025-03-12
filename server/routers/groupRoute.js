const express = require("express");
const isAuthenticate = require("../middleware");
const { createGroup, addNewMember, removeMember } = require("../controllers/groupController");
const router = express.Router();

router.post("/new-group", isAuthenticate, createGroup);
router.put("/add-new-member", isAuthenticate, addNewMember);
router.put("/remove-member", isAuthenticate, removeMember);

module.exports = router;
