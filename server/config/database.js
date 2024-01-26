const mongoose = require("mongoose");
require("dotenv").config();

const DBConnect = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database Connect Suucessfully !");
    })
    .catch((error) => {
      console.log("Error during connection on DB");
      process.next(1)
    });
};

module.exports = DBConnect
