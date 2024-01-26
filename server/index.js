const express = require("express");
const DBConnect = require("./config/database.js");
const fileupload = require('express-fileupload');
const cloudinary = require('./config/cloudinary.js');
const cors = require('cors');

const app = express();
require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
app.use(cors());


DBConnect();
cloudinary.cloudinaryConnect();

const Upload = require('./routes/FileRoute.js');

app.use('/api/v1/upload', Upload)

app.listen(port, () => {
  console.log("App is Running Successfully !");
});


