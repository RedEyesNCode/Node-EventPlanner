const varmalaSchema = require("../Model/varmalaSchema");

exports.createVarmala = async (req, res) => {
  try {
    const varmala = new varmalaSchema(req.body);
    await varmala.save();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "varmala as event Created Succesfully",
      data: varmala,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.deleteVarmala = async (req, res) => {
  try {
    const deletedvarmala = await varmalaSchema.findByIdAndDelete(
      req.body.varmalaId
    );
    res.status(200).json({
      status: "success",
      code: 200,
      message: "varmala as event Deleted Succesfully",
      data: deletedvarmala,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.updateVarmala = async (req, res) => {
  try {
    const updatedvarmala = await varmalaSchema.findByIdAndUpdate(
      req.body.varmalaId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      code: 200,
      message: "varmala as event Updated Succesfully",
      data: updatedvarmala,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.getAllVarmala = async (req, res) => {
  try {
    const allvarmala = await varmalaSchema.find();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "All varmala as event Fetched Succesfully",
      data: allvarmala,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};
