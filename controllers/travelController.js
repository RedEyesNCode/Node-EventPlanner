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
      const alltravel = await travelSchema.find();
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