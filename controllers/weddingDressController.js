const eventSchema = require("../Model/eventSchema");
const weddingDressSchema = require("../Model/weddingDress");

exports.createWeddingDress = async (req, res) => {
  try {
    const newWeddingDress = new weddingDressSchema(req.body);
    await newWeddingDress.save();
    res
      .status(200)
      .json({
        status: "Success",
        code: 200,
        message: "Wedding Dress Created Succesfully",
        data: newWeddingDress,
      });
  } catch (error) {
    res
      .status(200)
      .json({ status: "Error", code: 400, message: error.message });
  }
};

exports.deleteWeddingDress = async (req, res) => {
  try {
    const deletedWeddingDress = await weddingDressSchema.findByIdAndDelete(
      req.body.weddingDressId
    );
    if (!deletedWeddingDress) {
      return res
        .status(200)
        .json({
          status: "Error",
          code: 400,
          message: "Wedding Dress Not Found",
        });
    }
    res
      .status(200)
      .json({
        status: "Success",
        code: 200,
        message: "Wedding Dress Deleted Succesfully",
        data: deletedWeddingDress,
      });
  } catch (error) {
    res
      .status(200)
      .json({ status: "Error", code: 400, message: error.message });
  }
};

exports.uploadWeddingDressImage = async (req, res) => {
  if (!req.file) {
    res.status(200).json({ status: "Failed", error: "please upload a file" });
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
    const weddingDress = await weddingDressSchema.findById(
      req.body.weddingDressId
    );
    if (!weddingDress) {
      res
        .status(200)
        .json({ status: "Failed",code: 400 ,message: "Weddingn Dress not found" });
      return;
    }
    const Event = await eventSchema.findById(weddingDress.event_id);
    Event.eventImageUrl.push(req.file.location);
    await Event.save();
    weddingDress.images.push(req.file.location);
    if (
      weddingDress.images.length > 0 &&
      weddingDress.images[0] ===
        "https://onetouchmoments.co.in/wp-content/uploads/2024/05/28807096_JEMA_GER_1454-01-removebg-preview.png"
    ) {
      weddingDress.images.splice(0, 1);
    }
    await weddingDress.save();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Wedding Dress Image Uploaded Succesfully",
      data: data,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.getAllWeddingDress = async (req, res) => {
  try {
    const weddingDress = await weddingDressSchema
      .find()
      .populate("event_id")
      .exec();
    if (!weddingDress) {
      res
        .status(200)
        .json({ status: "Failed", message: "Weddingn Dress not found" });
      return;
    }
    res
      .status(200)
      .json({
        status: "Success",
        code: 200,
        message: "Wedding Dress Fetched Succesfully",
        data: weddingDress,
      });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};
