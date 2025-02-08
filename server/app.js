const express = require("express");
const cookieParser = require("cookie-parser");
const dbConection = require("./db");
const userRouters = require("./routers/userRoute");
const app = express();
// middleware
app.use(cookieParser());
app.use(express.json());
// mongoose conection
dbConection();
// user router
app.use("/api/v1/users", userRouters);
module.exports = app;
