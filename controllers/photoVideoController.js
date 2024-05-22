const eventSchema = require("../Model/eventSchema");
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
      if (allphotoVideo.length === 0) {
        return res.status(200).json({
          status: "Failed",
          code: 404,
          message: "No Photo-Video found",
        });
      }

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
  
  exports.uploadPhotoVideoImage = async (req, res) => {
    if (!req.file) {
      res.status(200).json({ status: "Failed", error: "Please upload a file" });
      return;
    }
    let data = {};
    if (req.file) {
      data = {
        url: req.file.location,
        type: req.file.mimetype,
      };
    }
    try {   
      const photoVideo = await photoVideoSchema.findById(req.body.photovideoId);
      if (!photoVideo) {
        res.status(200).json({ status: "Failed", error: "Photo-video not found" });
        return;
      }
      const Event = await eventSchema.findById(photoVideo.event_id);
    Event.eventImageUrl.push(req.file.location);
    await Event.save();
      photoVideo.images.push(req.file.location);
      if (
        photoVideo.images.length > 0 &&
        photoVideo.images[0] ===
        "https://onetouchmoments.co.in/wp-content/uploads/2024/05/multimedia.png"
      ) {
        photoVideo.images.splice(0, 1);
      }
      await photoVideo.save();
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "Photo-video Image Uploaded Succesfully",
        data: data,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };