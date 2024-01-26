const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const FileUpload = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required:true,
  },
  tags: {
      type: String,
      required:true,
  },
  email: {
    type: String,
    required:true,
  },
});

//// post middleware
FileUpload.post("save", async (doc) => {
  try {
    console.log("doc", doc);
    /// transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "Shaikh Zuber",
      to: doc.email,
      subject: "New File Uploded on Clodinary",
      html: `<h3>Hello ${doc.name}</h3>
           <p>You have uploaded file on cloudy successfully ! 
            </p> <p>Your Uploaded Image show here: </p><a href=${doc.imageUrl}>${doc.imageUrl}</a>`,
    });
    console.log(info);
  } catch (error) {
    console.log(error);
  }
});

const File = mongoose.model("File", FileUpload);
module.exports = File;
