
const express = require("express")
const dbConection = require("./db")
const app = express()
// mongoose conection
dbConection()
module.exports = app