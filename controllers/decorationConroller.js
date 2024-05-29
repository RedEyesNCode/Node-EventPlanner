const decorationSchema = require("../Model/decorationSchema");
const eventSchema = require("../Model/eventSchema");

exports.createDecoration = async (req, res) => {
  try {
    const decoration = new decorationSchema(req.body);
    await decoration.save();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Decoration Created Succesfully",
      data: decoration,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.deleteDecoration = async (req, res) => {
  try {
    const decoration = await decorationSchema.findByIdAndDelete(
      req.body.decorationId
    );
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Decoration Deleted Succesfully",
      data: decoration,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.getAllDecoration = async (req, res) => {
  try {
    const decorations = await decorationSchema.find().populate("event_id");
    if (decorations.length === 0) {
      res.status(200).json({
        status: "Failed",
        code: 404,
        message: "No Decoration as event found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Decorations fetched Succesfully",
      data: decorations,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.updateDecoration = async (req, res) => {
  try {
    const UpdatedDecoration = await decorationSchema.findByIdAndUpdate(
      req.body.decorationId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Decoration Updated Succesfully",
      data: UpdatedDecoration,
    })
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.uploadDecorationImage =  async (req, res) => {
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
    console.log(req.body);
    const decoration = await decorationSchema.findById(req.body.decorationId);
    if (!decoration) {
      res.status(200).json({ status: "Failed", code : 404,message: "Decoration not found" });
      return;
    }
    const Event = await eventSchema.findById(decoration.event_id);
    Event.eventImageUrl.push(req.file.location);
    await Event.save();
    decoration.images.push(req.file.location);
    if (
      decoration.images.length > 0 &&
      decoration.images[0] ===
      "https://onetouchmoments.co.in/wp-content/uploads/2024/05/wedding-arch.png"
    ) {
      decoration.images.splice(0, 1);
    }
    await decoration.save();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Decoration Image Uploaded Succesfully",
      data: data,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};