
const express = require("express")
const { registration } = require("../controllers/userController")
const router = express.Router()

router.post("/sign-up",registration)

module.exports = router