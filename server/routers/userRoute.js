
const express = require("express")
const { registration, login, logout } = require("../controllers/userController")
const router = express.Router()

router.post("/sign-up",registration)
router.get("/sign-in",login)
router.get("/log-out",logout)

module.exports = router