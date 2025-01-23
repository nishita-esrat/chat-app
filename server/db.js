const mongoose = require("mongoose");

const dbConection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("database connection is on");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = dbConection;
