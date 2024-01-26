const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    // fetch file from request
    const file = req.files.file;
    console.log("File is here", file);

    // create path wheere file need to stored on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("PATH", path);

    /// add path to the move function
    file.mv(path, (error) => {
      console.log(error);
    });

    //create successfull response
    res.json({
      success: true,
      message: "Local File Uploaded Successfully !",
    });
  } catch (error) {
    console.log(error);
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudy(file, folder, quality) {
  const options = { folder };
  if (quality) {
    options.quality = quality;
  }
  console.log("opts", options);
  console.log("file", file);
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//// Image upload handler

exports.ImageUpload = async (req, res) => {
  try {
    //// data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log("file", file);

    /// Validation

    let selectformate = ["jpg", "jpeg", "png"];
    let fileType = file.name.split(".")[1].toLowerCase();

    /// File formate is not support

    if (!isFileTypeSupported(fileType, selectformate)) {
      return res.status(400).json({
        success: false,
        message: "File formate not supported",
      });
    }

    // File formate is support
    /// second argument passed as cloudinary folder name;
    const response = await uploadFileToCloudy(file, "mycloud");
    console.log("response", response);

    await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfuuly Uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong during image upload !",
    });
  }
};

exports.imageReducerUpload = async (req, res) => {
  try {
    //// data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.ImageReducefile;
    console.log("file", file);

    /// Validation

    let selectformate = ["jpg", "jpeg", "png"];
    let fileType = file.name.split(".")[1].toLowerCase();

    /// File formate is not support

    if (!isFileTypeSupported(fileType, selectformate)) {
      return res.status(400).json({
        success: false,
        message: "File formate not supported",
      });
    }

    // File formate is support
    /// second argument passed as cloudinary folder name;
    const response = await uploadFileToCloudy(file, "mycloud", 30);
    console.log("response", response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfuuly Uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong during image upload !",
    });
  }
};

//// Vido upload handler

exports.videoUpload = async (req, res) => {
  try {
    //// data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    console.log("file", file);

    /// Validation
    console.log("not working");
    let selectformate = ["mp4", "mov"];
    let fileType = file.name.split(".")[1].toLowerCase();
    console.log("working");
    /// File formate is not support

    if (!isFileTypeSupported(fileType, selectformate)) {
      return res.status(400).json({
        success: false,
        message: "File formate not supported",
      });
    }

    // File formate is support
    /// second argument passed as cloudinary folder name;

    const response = await uploadFileToCloudy(file, "mycloud");

    console.log("response");
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Video Successfuuly Uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrang during video upload  !",
    });
  }
};
