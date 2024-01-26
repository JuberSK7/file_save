const File = require("../models/File");

exports.getUploadedFile = async(req, res) => {
    try {
        const imageData = await File.find();
        // console.log('imageData', imageData);
        res.status(200).json({
            success: true,
            message: "files fetched successfully !",
            data:imageData
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error during fetch files"
        })
    }
}