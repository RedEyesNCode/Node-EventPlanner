const decorationSchema = require("../Model/decorationSchema");

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

exports.uploadDecorationImage = async (req, res) => {
    if (!req.file) {
      res.status(403).json({ status: false, error: "please upload a file" });
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
      const decoration = await decorationSchema.findById(req.body.decorationId);
      if (!decoration) {
        res.status(404).json({ status: false, error: "Decoration not found" });
        return;
      }
      decoration.image.push(req.file.location);
      await decoration.save();
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "Decoration Image Uploaded Succesfully",
        data: data,
      });
    } catch (error) {
      res
        .status(200)
        .json({ status: "Failed", code: 500, error: error.message });
    }
};