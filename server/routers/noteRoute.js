const express = require("express");
const isAuthenticate = require("../middleware");
const { createNote, deleteNote } = require("../controllers/noteController");
const router = express.Router();

router.post("/new-note", isAuthenticate, createNote);
router.delete("/delete-note/:noteId", isAuthenticate, deleteNote);

module.exports = router;
