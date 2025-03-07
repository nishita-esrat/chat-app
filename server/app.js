const express = require("express");
const cookieParser = require("cookie-parser");
const dbConection = require("./db");
const userRouters = require("./routers/userRoute");
const friendRouters = require("./routers/friendRoute");
const noteRouters = require("./routers/noteRoute");
const messagesRouters = require("./routers/messageRoute");
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
// note router
app.use("/api/v1/notes", noteRouters);
// messaging router
app.use("/api/v1/messages", messagesRouters);



module.exports = app;
