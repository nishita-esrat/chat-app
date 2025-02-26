
const express = require("express")
const isAuthenticate = require("../middleware")
const { createNote } = require("../controllers/noteController")
const router = express.Router()

router.post("/new-note",isAuthenticate,createNote)

module.exports = router