const File = require("../models/File");

exports.deleteUploadedFile = async(req, res) => {
    try {
        const imageId = req.params.id;

        console.log('delete id', imageId)
        const imageData = await File.findByIdAndDelete(imageId);
        // console.log('imageData', imageData);
        res.status(200).json({
            success: true,
            message: "files deleted successfully !",
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error during delete files"
        })
    }
}