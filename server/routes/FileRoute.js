const express = require("express");
const router = express.Router();

const {
  ImageUpload,
  videoUpload,
  imageReducerUpload,
  localFileUpload,
} = require("../controllers/FileUpload");
const { getUploadedFile } = require("../controllers/getUploadFile");
const { deleteUploadedFile } = require("../controllers/DeleteFile");

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", ImageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageReducerUpload", imageReducerUpload);
router.delete("/deleteFileondb/:id", deleteUploadedFile);

router.get("/getuploadedimage", getUploadedFile);

module.exports = router;
