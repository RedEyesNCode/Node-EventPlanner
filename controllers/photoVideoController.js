const photoVideoSchema = require("../Model/photoVideoSchema");

exports.createPhotoVideo = async (req, res) => {
    try {
      const photoVideo = new photoVideoSchema(req.body);
      await photoVideo.save();
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Photo-Video Created Succesfully",
        data: photoVideo,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };
  
  exports.deletePhotoVideo = async (req, res) => {
    try {
      const deletedphotoVideo = await photoVideoSchema.findByIdAndDelete(
        req.body.photoVideoId
      );
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Photo-Video Deleted Succesfully",
        data: deletedphotoVideo,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };
  
  exports.updatePhotoVideo = async (req, res) => {
    try {
      const updatedphotoVideo = await photoVideoSchema.findByIdAndUpdate(
        req.body.photoVideoId,
        req.body,
        { new: true }
      );
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Photo-Video Updated Succesfully",
        data: updatedphotoVideo,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };
  
  exports.getAllPhotoVideo = async (req, res) => {
    try {
      const allphotoVideo = await photoVideoSchema.find().populate("event_id");
      res.status(200).json({
        status: "success",
        code: 200,
        message: "All Photo-Video Fetched Succesfully",
        data: allphotoVideo,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };
  