const panditSchema = require("../Model/panditSchema");

exports.createPandit = async (req, res) => {
  try {
    const newPandit = new panditSchema(req.body);
    await newPandit.save();
    res
      .status(200)
      .json({
        status: "Success",
        code: 200,
        message: "Pandit Created Succesfully",
        data: newPandit,
      });
  } catch (error) {
    res
      .status(200)
      .json({ status: "Failed", code: 500, message: error.message });
  }
};

exports.getPandit = async (req, res) => {
  try {
    const pandit = await panditSchema.find();
    if (pandit.length === 0) {
      return res
        .status(200)
        .json({ status: "Failed", code: 404, message: "No Pandit found" });
    }
    res
      .status(200)
      .json({
        status: "Success",
        code: 200,
        message: "Pandit Fetched Succesfully",
        data: pandit,
      });
  } catch (error) {
    res
      .status(200)
      .json({ status: "Failed", code: 500, message: error.message });
  }
};

exports.deletePandit = async (req, res) => {
  try {
    const pandit = await panditSchema.findByIdAndDelete(req.body.panditId);
    res
      .status(200)
      .json({
        status: "Success",
        code: 200,
        message: "Pandit Deleted Succesfully",
        data: pandit,
      });
  } catch (error) {
    res
      .status(200)
      .json({ status: "Failed", code: 500, message: error.message });
  }
};

exports.uploadPanditImage = async (req, res) => {
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
    const pandit = await panditSchema.findById(req.body.panditId);
    if (!pandit) {
      res.status(200).json({ status: "Failed",code : 404, message: "Pandit not found" });
      return;
    }
    pandit.images.push(req.file.location);
    if (
      pandit.images.length > 0 &&
      pandit.images[0] ===
        "https://onetouchmoments.co.in/wp-content/uploads/2024/05/hindu.png"
    ) {
      pandit.images.splice(0, 1);
    }
    await pandit.save();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Pandit Image Uploaded Succesfully",
      data: data,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};
