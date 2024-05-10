const travelSchema = require("../Model/travelSchema");

exports.createTravel = async (req, res) => {
  try {
    const travel = new travelSchema(req.body);
    await travel.save();
    res
      .status(200)
      .json({
        status: "success",
        code: 200,
        message: "Travel Created Succesfully",
        data: travel,
      });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.deleteTravel = async (req, res) => {
  try {
    const deletedtravel = await travelSchema.findByIdAndDelete(
      req.body.travelId
    );
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Travel Deleted Succesfully",
      data: deletedtravel,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.updateTravel = async (req, res) => {
  try {
    const updatedtravel = await travelSchema.findByIdAndUpdate(
      req.body.travelId,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({
        status: "success",
        code: 200,
        message: "Travel Updated Succesfully",
        data: updatedtravel,
      });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};


exports.getAllTravel = async (req, res) => {
    try {
      const alltravel = await travelSchema.find().populate("event_id");
      if (alltravel.length === 0) {
        
        return res.status(200).json({
          status: "Failed",
          code: 404,
          message: "No Travel found",
        });
      }

      res
        .status(200)
        .json({
          status: "success",
          code: 200,
          message: "All Travel Fetched Succesfully",
          data: alltravel,
        });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  }

  exports.uploadTravelImage = async (req, res) => {
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
      const travel = await travelSchema.findById(req.body.travelId);
      if (!travel) {
        res.status(200).json({ status: "Failed", error: "Travel not found" });
        return;
      }
      travel.images.push(req.file.location);
      if (
        travel.images.length > 0 &&
        travel.images[0] ===
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK4CYRZ8ywvB2LlPKMlDs4mj2uEiFPLZPwNw&s"
      ) {
        travel.images.splice(0, 1);
      }
      await travel.save();
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "Travel Image Uploaded Succesfully",
        data: data,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };