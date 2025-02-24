const express = require("express");
const cookieParser = require("cookie-parser");
const dbConection = require("./db");
const userRouters = require("./routers/userRoute");
const friendRouters = require("./routers/friendRoute");
const cloudinary = require("./utility/cloudinaryConfig");
const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());

// mongoose conection
dbConection();

// Add a simple test to check if Cloudinary is working
cloudinary.api
  .ping()
  .then(() => console.log("✅ Cloudinary connected successfully"))
  .catch((err) => console.error("❌ Cloudinary connection failed", err));



// user router
app.use("/api/v1/users", userRouters);
// friend req router
app.use("/api/v1/friends", friendRouters);



module.exports = app;
