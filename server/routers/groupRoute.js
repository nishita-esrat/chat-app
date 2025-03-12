const express = require("express");
const isAuthenticate = require("../middleware");
const { createGroup } = require("../controllers/groupController");
const router = express.Router();

router.post("/new-group", isAuthenticate, createGroup);

module.exports = router;
