const express = require("express");
const isAuthenticate = require("../middleware");
const { createGroup, addNewMember } = require("../controllers/groupController");
const router = express.Router();

router.post("/new-group", isAuthenticate, createGroup);
router.put("/add-new-member", isAuthenticate, addNewMember);

module.exports = router;
